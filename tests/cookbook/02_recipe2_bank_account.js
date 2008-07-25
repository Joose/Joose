plan(4)

Module("Bank", function (m) {
    Class("Account", {
        has: {
            balance: {
                is: rw,
                init: 0
            }
        },
        methods: {
            deposit: function (amount) {
                this.setBalance(this.getBalance() + amount)
            },
            withdraw: function (amount) {
                if(this.getBalance() < amount) {
                    throw "Account overdrawn"
                }
                this.setBalance(this.getBalance() - amount);
                return this.getBalance();
            }
        }
    });
    
    Class("CheckingAccount", {
        isa: m.Account,
        has: {
            overdraftAccount: {
                isa: m.Account,
                is: rw
            }
        },
        override: {
            withdraw: function (amount) {
                var overdraftAmount = amount - this.getBalance()
                
                if(this.overdraftAccount && overdraftAmount > 0) {
                   this.overdraftAccount.withdraw(overdraftAmount);
                   this.deposit(overdraftAmount);
                }
                
                this.SUPER(amount)
            }
        }
    })
})

var savingsAccount  = new Bank.Account({ balance: 100 });
var checkingAccount = new Bank.CheckingAccount({ 
    balance:          200, 
    overdraftAccount: savingsAccount
});

ok(savingsAccount.getBalance() == 100, "Savings balance is correct");
ok(checkingAccount.getBalance() == 200, "Checking balance is correct")

checkingAccount.withdraw(250);

ok(checkingAccount.getBalance() == 0, "Checking account is empty");
ok(savingsAccount.getBalance() == 50, "50 got taken from the savings account")

endTests()