export default function formatType(inputType) {
  // Convert "-" to " " and capitalize words
  return inputType
      .replace(/-/g, " ")
      .replace(/\w\S*/g, (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      });
}