use Text::ParseWords;
use File::Find::Rule;
use Path::Class;
use Data::Dump;

my $LIBDIR = dir('../lib');

my @js = File::Find::Rule->or(
	File::Find::Rule->directory->name('.svn')->prune->discard,
	File::Find::Rule->directory->name('todo')->prune->discard,
	File::Find::Rule->file->name('*.js')
)->in($LIBDIR);


my %metric;


foreach (@js) {
#    my @lines = file($_)->slurp;
    my @lines = (qx!java -jar ../ext/yuicompressor-2.4.1.jar $_!);
    
    my @words = quotewords('(\s|{|}|;|:|=|\[|\]|\(|\)|,)+', 0, @lines); 
    foreach (@words) {
        next if !$_;
        
        $metric{$_} = 0 unless exists $metric{$_};
        
        $metric{$_}++;
    }
}

my @details;

foreach my $word (keys(%metric)) {
    push @details, {
        'word' => $word,
        'count' => $metric{$word},
        'length' => length($word),
        'bytes' => $metric{$word} * length($word)
    };
}

#dd(@details);

@details = sort {
    return $b->{count} <=> $a->{count} if $b->{bytes} == $a->{bytes};
    return $b->{bytes} <=> $a->{bytes};
} @details;


foreach my $word (@details) {
    printf("%03d, %04d: %s\n", $word->{count}, $word->{bytes}, $word->{word});
}