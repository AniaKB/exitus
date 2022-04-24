console.clear();
Vue.config.devtools = true;
window.__VUE_PROD_DEVTOOLS__ = true;
new Vue ({
  el: '#app',
  components: {
    VueSlider: window['vue-slider-component']
  },
  data: function () {
    return {
      sales: 1_200_000,
      company: 'Salesforce',
      profits: 225_000,
      addbacks: 30_000,
      discretionary: 255_000,
      taxes: 0.20,
      salesMultiple: 0.58,
      earningsMultiple: 3.25,
      sellingPrice: 1_200_000,
      workingCap: 50_000,
      closingFees: 12_500,
      guaranteeSBA: 20_000,
      downpaymentPercent: 10,
      personalExpenses: 0,
      annualInterestRate: 0.06,
      numberOfMonths: 12,
      numberOfYears: 10
    };
  },
  computed: {
    cashFlow: function () {
      const taxesOnDiscretionaryEarnings = this.discretionary * this.taxes;
      return Math.round(this.discretionary - taxesOnDiscretionaryEarnings);
    },
    valueSales: function () {
      return Math.round(
        this.sales *
        this.salesMultiple
      );
    },
    valueEarnings: function () {
      return Math.round(
        this.cashFlow *
        this.earningsMultiple
      );
    },
    subtotal: function () {
      const subTotal = (
        this.sellingPrice +
        this.workingCap +
        this.closingFees +
        this.guaranteeSBA
      );
      return Math.round(subTotal);
    },
    downpayment: function () {
      return Math.round(
        this.subtotal *
        (this.downpaymentPercent / 100)
      );
    },
    loanAmount: function () {
      let loanAmount = (
        this.subtotal -
        this.downpayment
      );
      loanAmount = Math.round(loanAmount);
      loanAmount = Math.max(loanAmount, 0);
      return loanAmount;
    },
    monthlyInterestRate: function () {
      return this.annualInterestRate / this.numberOfMonths;
    },
    incrementedMonthlyInterest: function () {
      return 1 + this.monthlyInterestRate;
    },
    totalMonths: function () {
      return this.numberOfMonths * this.numberOfYears;
    },
    powerfulInterest: function () {
      return Math.pow(this.incrementedMonthlyInterest, this.totalMonths);
    },
    payment: function () {
      const total = (
        this.loanAmount *
        this.monthlyInterestRate *
        this.powerfulInterest *
        100
      );
      const denominator = this.powerfulInterest - 1;
      let payment = total / denominator || 0;
      payment = Math.round(payment) / 100;
      return payment;
    },
    annualizedDebt: function () {
      const annualPayment = this.payment * 12;
      return Math.round(annualPayment * 100) / 100;
    },
    netCashDebt: function () {
      return (
        this.cashFlow -
        this.personalExpenses
      );
    },
    debtService: function () {
      const remainingYearlyMoney = this.netCashDebt / this.annualizedDebt;
      return Math.round(remainingYearlyMoney * 100) / 100;
    }
  },
  methods: {
    percent: function (num) {
      return num * 100;
    },
    monthlyPayment: function () {},
    getData: function () {
      /* network request goes here */
      this.sales = 1_200_000;
      this.company = 'Salesforce';
      this.profits = 225_000;
      this.addbacks = 30_000;
      this.discretionary = 255_000;
      this.taxes = 0.20;
      this.salesMultiple = 0.58;
      this.earningsMultiple = 3.25;
      this.sellingPrice = 1_200_000;
      this.workingCap = 50_000;
      this.closingFees = 12_500;
      this.guaranteeSBA = 20_000;
      this.downpaymentPercent = 10;
      this.personalExpenses = 0;
      this.annualInterestRate = 0.06;
      this.numberOfMonths = 12;
      this.numberOfYears = 10;
    }
  },
  created: function () {
    this.getData();
  }
});
