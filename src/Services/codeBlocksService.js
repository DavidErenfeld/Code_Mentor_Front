export const getCodeBlockData = async (numericId) => {
  try {
    const response = await fetch(
      `https://boiling-springs-91338-006b899baec7.herokuapp.com/codeBlocks`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch: " + response.statusText);
    }
    const data = await response.json();
    const codeBlock = data.find((block) => block.id === numericId);
    if (codeBlock) {
      return codeBlock;
    } else {
      throw new Error("Code block not found");
    }
  } catch (error) {
    console.error("Error fetching code blocks:", error.message);
    return { title: "Error", code: "// Error fetching code block" };
  }
};
