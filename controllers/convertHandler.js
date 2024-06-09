function ConvertHandler() {

  // Define a list of valid units
  const validUnits = ['gal', 'l', 'lbs', 'kg', 'mi', 'km'];

  this.getNum = function(input) {
    let result = 1;
    // Check for double fraction
    if (input.split('/').length > 2) {
      // Handle double fraction error
      result = 'invalid number';
    } else {
      // Updated regex to capture fractions and whole numbers
      const regex = /^(\d+(?:\.\d+)?)(\/(\d+(?:\.\d+)?))?/;
      const match = input.match(regex);
      if (match) {
        const numerator = Number(match[1]);
        const denominator = match[3] ? Number(match[3]) : 1; // Default denominator to 1 if not present
        result = numerator / denominator;
      } 
    }
    
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    const regex = /[a-zA-Z]+$/;
    const match = input.match(regex);
    
    if (match) {
      const unit = match[0].toLowerCase(); // Normalize unit for comparison
      if (validUnits.includes(unit)) {
        result = unit;
        if (unit === 'l') result = 'L'; // Normalize unit for output
      } else {
        // Handle invalid unit
        result = "invalid unit";
      }
    } else {
      // Handle case where no unit is found
      result = "invalid unit";
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch (initUnit.toLowerCase()) {
      case 'gal':
        result = 'L';
        break;
      case 'l':
        result = 'gal';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      default:
        result = 'invalid';
        break;
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch (unit.toLowerCase()) {
      case 'gal':
        result = 'gallons';
        break;
      case 'l':
        result = 'liters';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
      default:
        result = 'invalid';
        break;
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit.toLowerCase()) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        result = 'invalid unit';
        break;
    }
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
