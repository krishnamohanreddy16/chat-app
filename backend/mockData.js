// backend/mockData.js
const sessions = [
  // example existing session
  {
    id: "sess-1",
    title: "Shopping list help",
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
    messages: [
      { role: "user", text: "Help me make a shopping list for a party", time: Date.now() - 1000 * 60 * 60 * 24 },
      {
        role: "assistant",
        text: "Here is a structured list of items you might need.",
        time: Date.now() - 1000 * 60 * 60 * 23,
        table: {
          columns: ["Item", "Quantity", "Category"],
          rows: [
            ["Soda", "6 bottles", "Beverages"],
            ["Chips", "4 packets", "Snacks"],
            ["Charcuterie", "1 board", "Food"]
          ]
        }
      }
    ]
  }
];

// helper to create structured answer
function createStructuredAnswer(question) {
  // return an object containing text + table (mock)
  const text = `Mock answer for: "${question}"`;
  const table = {
    columns: ["Field", "MockValue1", "MockValue2"],
    rows: [
      ["Row A", "Value A1", "Value A2"],
      ["Row B", "Value B1", "Value B2"]
    ]
  };
  return { text, table };
}

module.exports = { sessions, createStructuredAnswer };
