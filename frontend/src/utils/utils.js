export function formatDate(date){
    return (
      date.toLocaleDateString("en-UK",
      {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      }
    ))
}