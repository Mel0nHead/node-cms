// CODE REVIEW EXERCISE
// Please imagine any code comments are review comments in GitHub

// Please use `const` instead of `var`. That way, it is more explicit whether the variable can be re-assigned or not :)
var animalData = [
  {
    id: 1,
    title: "hippo", // Just checking, is it a requirement to call the field `title`? Might make more sense to call it `name`
    faveFood: "carrots",
  },
  {
    id: 2,
    title: "Cat",
    faveFood: "carrots", // Just double-checking, is this correct? I wasn't aware cats liked carrots! :D
  },
  {
    id: 3,
    // Might make more sense if the titles for each object were consistent - maybe each title should be singular, and first letter should be capitalised?
    // e.g. `Hippo`, `Cat` and `Duck`
    title: "ducks",
    faveFood: "breadcrumbs",
  },
];

// Update the function name to be something that explains what is does a bit better
exports.findAnimal = function () {
  // It should be `x < animalData.length`, because the length of `animalData` might change
  for (x = 0; x < 3; x++) {
    // `animalData[x].title = args[0]` assigns the object's property of `title` to the value of `args[0]`.
    // Instead, you want the strict equality operator: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality
    if ((animalData[x].title = args[0])) {
      // It should be `arguments`, not `args`. More info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
      var answer = animalData[x].faveFood;
    }
  }
  // This function will always return `undefined`, as `answer` is used out of scope
  return answer;
};

// SUGGESTED IMPROVEMENT:
// 1. It's easier to use JavaScript's built in `array.prototype.find` :) More info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
// 2. In my opinion, it makes the code more readable if you use a well named argument, instead of using `arguments[0]`
// 3. Easy to add more functions to the export in the future if you export an object
function getFavFoodForAnimal(animalTitle) {
  const animal = animalData.find((a) => a.title === animalTitle);
  return animal && animal.faveFood ? animal.favFood : null;
}

module.exports = {
  getFavFoodForAnimal,
};
