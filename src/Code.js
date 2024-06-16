const codeBlocks = [
  {
    id: 1,
    title: "Loop Example",
    code: `for (let i = 0; i < 5; i++) { 
  if (i % 2 === 0) {
    console.log(\`Even: \${i}\`);
  } else {
    console.log(\`Odd: \${i}\`);
  }
}`,
    solution: `for (let i = 0; i < 5; i++) { 
  if (i % 2 === 0) {
    console.log(\`Even: \${i}\`);
  } else {
    console.log(\`Odd: \${i}\`);
  }
}`,
  },
  {
    id: 2,
    title: "Function Example",
    code: `function greet(name) {
  if (name) {
    console.log(\`Hello, \${name}!\`);
  } else {
    console.log("Hello, World!");
  }
}

greet("Alice");
greet();`,
    solution: `function greet(name) {
  if (name) {
    console.log(\`Hello, \${name}!\`);
  } else {
    console.log("Hello, World!");
  }
}

greet("Alice");
greet();`,
  },
  {
    id: 3,
    title: "Async Example",
    code: `async function fetchData() {
  try {
    let response = await fetch('https://api.example.com/data');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

fetchData();`,
    solution: `async function fetchData() {
  try {
    let response = await fetch('https://api.example.com/data');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

fetchData();`,
  },
  {
    id: 4,
    title: "Array Example",
    code: `const fruits = ["apple", "banana", "cherry"];
  fruits.map(fruit => fruit.toUpperCase())
        .filter(fruit => fruit.startsWith('A') || fruit.startsWith('B'))
        .forEach(fruit => console.log(fruit));`,
    solution: `const fruits = ["apple", "banana", "cherry"];
  fruits.map(fruit => fruit.toUpperCase())
        .filter(fruit => fruit.startsWith('A') || fruit.startsWith('B'))
        .forEach(fruit => console.log(fruit));`,
  },
];
export default codeBlocks;
