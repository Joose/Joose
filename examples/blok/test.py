import urllib2

def main():
  req = urllib2.Request('http://www.google.com')
  req.open();


if __name__ == "__main__":
  main()
