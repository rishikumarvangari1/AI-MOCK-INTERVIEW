/**
 * Comprehensive Technical & Career Knowledge Engine for AI Assistant
 * Provides accurate, structured, authoritative answers to technical, system design,
 * coding, and behavioral interview questions without requiring external API keys.
 */

const { DOMAINS } = require("../config/domains");

// -------------------------------------------------------------
// Core Knowledge Base Topics (75+ Comprehensive Domains & Concepts)
// -------------------------------------------------------------
const TOPICS = [
  // ==========================================
  // JAVASCRIPT & TYPESCRIPT
  // ==========================================
  {
    id: "js_event_loop",
    keywords: ["event loop", "eventloop", "call stack", "microtask", "macrotask", "task queue", "libuv"],
    answer: `**The JavaScript Event Loop Explained:**

JavaScript is single-threaded, meaning it has one call stack and executes one operation at a time. The Event Loop enables non-blocking asynchronous execution:

1. **Call Stack:** Executes synchronous functions in LIFO (Last In, First Out) order.
2. **Web APIs / Node.js APIs:** Handles async tasks in background threads (DOM events, timers, HTTP fetch requests, file I/O).
3. **Microtask Queue (High Priority):** Promise callbacks (\`.then()\`, \`await\`, \`queueMicrotask()\`, Node's \`process.nextTick\`). These run immediately when the current call stack clears, *before* any macrotasks.
4. **Macrotask Queue:** \`setTimeout\`, \`setInterval\`, \`setImmediate\`, I/O callbacks.

**Execution Cycle:**
\`\`\`text
Call Stack empties ➔ Drain ALL Microtasks ➔ Render UI (browser) ➔ Pick ONE Macrotask ➔ Repeat
\`\`\`

*Interview Tip:* If asked about \`setTimeout(fn, 0)\` vs \`Promise.resolve().then(fn)\`, mention that the Promise (microtask) will ALWAYS run before \`setTimeout\` (macrotask)!`
  },
  {
    id: "js_closures",
    keywords: ["closure", "closures", "lexical scope", "scope chain", "outer function"],
    answer: `**JavaScript Closures Explained:**

A **closure** is the combination of a function bundled together with references to its surrounding state (lexical environment). An inner function retains access to variables from its outer enclosing scope even after the outer function has finished executing.

**Primary Use Cases:**
- **Data Encapsulation / Private Variables:** Preventing global scope pollution.
- **Factory Functions & Currying:** Creating customized utility functions with pre-configured parameters.
- **Event Handlers & Callbacks:** Maintaining state across asynchronous boundaries.

\`\`\`javascript
function createCounter(initialValue = 0) {
  let count = initialValue; // Private variable hidden from outer scope
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter(10);
counter.increment(); // 11
console.log(counter.getCount()); // 11
\`\`\`

*Interview Tip:* Mention memory implications — closures keep outer variables alive in heap memory, so unreferenced large objects in closures can cause memory leaks if not cleaned up.`
  },
  {
    id: "js_var_let_const",
    keywords: ["var vs let", "let vs const", "var let const", "temporal dead zone", "tdz", "hoisting"],
    answer: `**Difference between \`var\`, \`let\`, and \`const\` in JavaScript:**

| Feature | \`var\` | \`let\` | \`const\` |
|---|---|---|---|
| **Scope** | Function scope | Block scope (\`{ ... }\`) | Block scope (\`{ ... }\`) |
| **Hoisting** | Hoisted with \`undefined\` | Hoisted in Temporal Dead Zone (TDZ) | Hoisted in Temporal Dead Zone (TDZ) |
| **Re-declaration** | Allowed | SyntaxError | SyntaxError |
| **Re-assignment** | Allowed | Allowed | TypeError (binding is immutable) |

**Temporal Dead Zone (TDZ):**
The period between entering the block scope and the variable declaration where accessing \`let\` or \`const\` throws a \`ReferenceError\`.

*Important Detail on \`const\`:* \`const\` creates an immutable binding to the memory address. Object properties and array elements can still be mutated unless frozen with \`Object.freeze()\`.`
  },
  {
    id: "js_promises_async_await",
    keywords: ["promise", "promises", "async await", "promise.all", "promise.race", "promise.allsettled"],
    answer: `**JavaScript Promises & Async/Await:**

A **Promise** represents the eventual completion or failure of an asynchronous operation and its resulting value.

**Three States:** \`pending\` ➔ \`fulfilled\` (resolved with value) OR \`rejected\` (with error).

**Key Combinators:**
- **\`Promise.all([p1, p2])\`:** Fails fast if any promise rejects; succeeds only when ALL resolve.
- **\`Promise.allSettled([p1, p2])\`:** Waits for all to finish, returning array of \`{ status: 'fulfilled'|'rejected', value|reason }\`. Ideal for batch operations where partial success is acceptable.
- **\`Promise.race([p1, p2])\`:** Resolves/rejects with the result of the *first* settled promise (often used for request timeouts).
- **\`Promise.any([p1, p2])\`:** Resolves with the *first fulfilled* promise; rejects only if ALL reject (\`AggregateError\`).

\`\`\`javascript
async function fetchUserData(userId) {
  try {
    const res = await fetch(\`/api/users/\${userId}\`);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return await res.json();
  } catch (err) {
    console.error("Failed to load user:", err);
    throw err;
  }
}
\`\`\``
  },
  {
    id: "js_this_prototypes",
    keywords: ["this keyword", "call apply bind", "prototype", "prototypal inheritance", "arrow function this"],
    answer: `**The \`this\` Keyword & Prototypal Inheritance in JavaScript:**

**How \`this\` is Determined:**
1. **Default Binding:** In non-strict mode, \`this\` refers to \`window\` / \`global\`; in strict mode (\`'use strict'\`), it is \`undefined\`.
2. **Implicit Binding:** When a method is called on an object (\`obj.greet()\`), \`this\` refers to \`obj\`.
3. **Explicit Binding:** Set explicitly using \`fn.call(ctx, arg1)\`, \`fn.apply(ctx, [args])\`, or \`fn.bind(ctx)\`.
4. **\`new\` Binding:** When invoked with \`new Constructor()\`, \`this\` is bound to the freshly allocated object.
5. **Arrow Functions:** Do NOT have their own \`this\`. They inherit \`this\` lexically from their enclosing scope.

**Prototypal Inheritance:**
Every JavaScript object has an internal link to another object called its prototype (\`__proto__\` / \`Object.getPrototypeOf()\`). When looking up a property, the engine traverses up the **prototype chain** until found or reaching \`null\`.`
  },
  {
    id: "js_debounce_throttle",
    keywords: ["debounce", "throttle", "debouncing", "throttling"],
    answer: `**Debounce vs Throttle in JavaScript:**

Both are optimization techniques to limit the rate at which a function executes, especially during frequent DOM events (resize, scroll, typing).

- **Debounce:** Delays function execution until **X milliseconds have passed since the LAST time** the event was triggered.
  - *Best for:* Search autocomplete inputs, auto-saving drafts, window resizing.
- **Throttle:** Ensures the function executes **at most once every X milliseconds**, regardless of how many times the event fires.
  - *Best for:* Infinite scroll loading, scroll position indicators, game loop actions.

\`\`\`javascript
function debounce(fn, delayMs = 300) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delayMs);
  };
}

function throttle(fn, limitMs = 300) {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limitMs);
    }
  };
}
\`\`\``
  },
  {
    id: "typescript_core",
    keywords: ["typescript", "interface vs type", "generics", "any vs unknown", "type narrowing"],
    answer: `**TypeScript Essentials for Technical Interviews:**

- **\`interface\` vs \`type\`:**
  - **\`interface\`:** Best for object contracts and public APIs. Supports declaration merging (adding fields by declaring the interface again). Extends via \`extends\`.
  - **\`type\`:** More flexible; supports union types (\`string | number\`), intersections, primitives, tuples, and mapped types. Cannot be re-opened for declaration merging.
- **\`any\` vs \`unknown\` vs \`never\`:**
  - \`any\`: Disables all type checking (unsafe).
  - \`unknown\`: Type-safe counterpart to \`any\`. You must narrow the type (via \`typeof\`, \`instanceof\`, or type guards) before operating on it.
  - \`never\`: Represents values that never occur (e.g. function throwing an exception or exhaustive switch checks).
- **Generics (\`<T>\`):** Allows writing reusable functions/classes that work over a variety of types while retaining compile-time type safety.
  \`\`\`typescript
  function firstItem<T>(arr: T[]): T | undefined {
    return arr[0];
  }
  \`\`\``
  },

  // ==========================================
  // REACT & MODERN FRONTEND
  // ==========================================
  {
    id: "react_virtual_dom",
    keywords: ["virtual dom", "reconciliation", "diffing", "react fiber"],
    answer: `**React's Virtual DOM & Reconciliation:**

The **Virtual DOM (VDOM)** is an in-memory lightweight JavaScript representation of the actual browser DOM:

1. **Render Phase:** When state or props change, React executes the component function and produces a new Virtual DOM tree.
2. **Reconciliation (Diffing Algorithm):** React compares the new VDOM against the previous VDOM snapshot using an $O(n)$ heuristic algorithm:
   - Elements of different types re-create the subtree entirely.
   - The \`key\` prop uniquely identifies children to preserve identity across list mutations.
3. **Commit Phase:** React batches the calculated differences and updates *only* the specific real DOM nodes that actually changed, avoiding expensive layout reflows and repaints.

*Interview Tip:* Mention **React Fiber**, the re-implemented core reconciliation engine that enables incremental rendering, interruptible work, and concurrency.`
  },
  {
    id: "react_hooks_overview",
    keywords: ["react hooks", "usestate", "useeffect", "useref", "hooks rules", "custom hooks"],
    answer: `**React Hooks Core Guide:**

Hooks allow functional components to manage state and lifecycle without writing classes.

**Rules of Hooks:**
1. Only call hooks at the **top level** of components (never inside loops, conditions, or nested functions).
2. Only call hooks from React function components or custom hooks.

**Key Hooks:**
- **\`useState\`:** Local component state.
- **\`useEffect\`:** Handles side effects (data fetching, subscriptions, DOM mutation).
  - Empty array \`[]\`: Runs once on mount; cleanup runs on unmount.
  - Dependency array \`[dep1]\`: Runs on mount and whenever dependencies change.
  - No array: Runs after every render.
- **\`useRef\`:** Holds a mutable reference that persists across renders without causing re-renders when mutated. Ideal for direct DOM access (\`inputRef.current.focus()\`) or storing timer IDs.
- **\`useContext\`:** Consumes values from a React Context without prop drilling.`
  },
  {
    id: "react_usememo_usecallback",
    keywords: ["usememo", "usecallback", "memoization in react", "react.memo"],
    answer: `**\`useMemo\` vs \`useCallback\` in React:**

Both hooks are used for performance optimization through memoization:

- **\`useMemo\`:** Memoizes the **result of a calculation**. It re-computes only when its dependencies change.
  \`\`\`javascript
  const sortedUsers = useMemo(() => {
    return expensiveSort(users, filter);
  }, [users, filter]);
  \`\`\`
- **\`useCallback\`:** Memoizes a **function definition** between renders. It ensures the function maintains referential equality across re-renders so child components wrapped in \`React.memo\` don't needlessly re-render.
  \`\`\`javascript
  const handleDelete = useCallback((id) => {
    deleteUserApi(id);
  }, []);
  \`\`\`

*Interview Tip:* Don't overuse them everywhere! They have memory and comparison overhead. Use them only when profiling demonstrates real performance bottlenecks or when passing functions to optimized child components.`
  },
  {
    id: "nextjs_rendering_modes",
    keywords: ["ssr vs ssg", "next.js rendering", "incremental static regeneration", "isr", "server components", "rsc"],
    answer: `**Next.js Rendering Patterns (SSR, SSG, ISR, CSR, RSC):**

- **SSG (Static Site Generation):** HTML is generated at **build time**. Fastest possible response served from CDN cache. Best for marketing pages, blogs, and public docs.
- **SSR (Server-Side Rendering):** HTML is dynamically generated on the server for **every incoming request**. Best for authenticated, user-personalized, or real-time pages requiring up-to-date SEO.
- **ISR (Incremental Static Regeneration):** Updates static pages in the background as new requests arrive using a \`revalidate\` timer without rebuilding the whole website.
- **CSR (Client-Side Rendering):** Empty HTML bundle shipped to browser; JavaScript downloads, executes, and renders UI via client fetch requests.
- **React Server Components (RSC):** Render exclusively on the server and stream to the client with zero added JavaScript bundle size.`
  },

  // ==========================================
  // PYTHON CORE & BACKEND
  // ==========================================
  {
    id: "python_gil",
    keywords: ["gil", "global interpreter lock", "python multithreading", "python multiprocessing"],
    answer: `**Python's Global Interpreter Lock (GIL):**

The **GIL** is a mutual exclusion lock used by the standard CPython interpreter to ensure that only one native OS thread executes Python bytecode at any given moment.

**Why the GIL Exists:**
- CPython's memory management uses reference counting, which is not thread-safe. The GIL simplifies memory management and C-extension integration without requiring fine-grained locks across all memory allocations.

**Impact on Applications:**
- **I/O-Bound Tasks (HTTP, DB, Disk):** Multithreading works well because threads release the GIL while waiting on system I/O.
- **CPU-Bound Tasks (Image processing, ML, Math):** Standard Python threads will NOT achieve multi-core parallel speedups.

**How to Achieve True Parallelism in Python:**
- Use the \`multiprocessing\` module or \`concurrent.futures.ProcessPoolExecutor\` to spawn independent OS processes with their own memory space and interpreter.
- Offload heavy computation to compiled C/C++/Rust extensions (like NumPy or Cython) which release the GIL.`
  },
  {
    id: "python_asyncio",
    keywords: ["asyncio", "python async", "coroutines in python", "async def", "await in python"],
    answer: `**Python AsyncIO & Asynchronous Programming:**

AsyncIO provides cooperative multitasking and asynchronous concurrency on a single thread using an event loop:

- **\`async def\`:** Declares a coroutine function.
- **\`await\`:** Suspends the execution of the coroutine until the awaitable finishes, relinquishing control back to the event loop to run other scheduled tasks.
- **\`asyncio.gather(*tasks)\`:** Runs multiple coroutines concurrently and collects their results.
- **\`asyncio.run(main())\`:** Creates and executes a fresh event loop until the coroutine completes.

\`\`\`python
import asyncio

async def fetch_api(url, delay):
    await asyncio.sleep(delay)
    return f"Response from {url}"

async def main():
    results = await asyncio.gather(
        fetch_api("service-A", 1),
        fetch_api("service-B", 2)
    )
    print(results)

asyncio.run(main())
\`\`\``
  },
  {
    id: "python_decorators",
    keywords: ["decorator", "decorators", "python decorator", "@wraps"],
    answer: `**Python Decorators Explained:**

A **decorator** is a design pattern in Python that dynamically extends or modifies the behavior of a function or class without modifying its source code. In Python, decorators are callable objects that accept a function as an argument and return an enhanced function.

\`\`\`python
import time
from functools import wraps

def time_execution(func):
    @wraps(func)  # Preserves func's __name__ and __doc__
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"[{func.__name__}] executed in {elapsed:.4f}s")
        return result
    return wrapper

@time_execution
def process_data(records):
    time.sleep(0.1)
    return len(records)
\`\`\`

*Interview Tip:* Always mention \`@functools.wraps\`! Without it, the decorated function loses its original \`__name__\` and docstrings, which complicates debugging and introspection.`
  },
  {
    id: "python_generators",
    keywords: ["generator", "generators", "yield keyword", "iterator vs iterable"],
    answer: `**Python Generators & Iterators:**

- **Iterable:** Any object capable of returning its members one at a time (implements \`__iter__()\`). Examples: lists, tuples, dicts.
- **Iterator:** An object representing a stream of data that produces consecutive values via \`__next__()\`.
- **Generator:** A special function that produces a sequence of values on demand using the \`yield\` keyword instead of \`return\`.

**Key Advantages:**
- **Lazy Evaluation / Memory Efficiency:** Computes values on the fly instead of storing large lists in RAM ($O(1)$ memory vs $O(N)$).

\`\`\`python
# Reading a 10 GB log file line-by-line without memory crash
def stream_large_log(filepath):
    with open(filepath, 'r') as file:
        for line in file:
            if "ERROR" in line:
                yield line.strip()

for error in stream_large_log("production.log"):
    print(error)
\`\`\``
  },

  // ==========================================
  // JAVA & BACKEND
  // ==========================================
  {
    id: "oop_principles",
    keywords: ["oop", "object oriented", "encapsulation", "inheritance", "polymorphism", "abstraction"],
    answer: `**The 4 Core OOP Principles:**

1. **Encapsulation:** Bundling state (data fields) and behavior (methods) together while restricting direct external access using access modifiers (\`private\`, \`protected\`, \`public\`).
2. **Abstraction:** Hiding complex implementation details and exposing only the essential interface to the user (via abstract classes and interfaces).
3. **Inheritance:** Enabling a new class (subclass/child) to acquire fields and methods of an existing class (superclass/parent), promoting code reusability.
4. **Polymorphism ("Many forms"):**
   - **Compile-Time (Static) Polymorphism:** Method Overloading (same method name, different parameter signature in the same class).
   - **Runtime (Dynamic) Polymorphism:** Method Overriding (subclass provides its own implementation of a method declared in its parent class using \`@Override\`).`
  },
  {
    id: "java_jvm_memory",
    keywords: ["jvm", "garbage collection in java", "heap vs stack", "java memory"],
    answer: `**JVM Architecture & Memory Management:**

- **Stack Memory:** Stores primitive values and references to objects in the heap for the current thread of execution. Memory allocation is fast and strictly scoped to function execution (LIFO).
- **Heap Memory:** Shared across all threads; stores all created objects and JRE classes. Divided into:
  - **Young Generation:** Eden space + 2 Survivor spaces (S0, S1). Most objects die young here (collected by Minor GC).
  - **Old Generation (Tenured):** Holds long-surviving objects promoted from the Young Generation (collected by Major/Full GC).
  - **Metaspace (Java 8+):** Stores class metadata in native OS memory instead of the old PermGen.

**Garbage Collectors:** G1 GC (default), ZGC (ultra-low latency <1ms pauses), Parallel GC.`
  },
  {
    id: "java_collections",
    keywords: ["java collections", "arraylist vs linkedlist", "hashmap internal", "concurrenthashmap"],
    answer: `**Java Collections Framework Fundamentals:**

- **\`ArrayList\` vs \`LinkedList\`:**
  - \`ArrayList\`: Backed by dynamic array. Fast random access ($O(1)$ by index); slow insertions/deletions in middle ($O(N)$ due to element shifting).
  - \`LinkedList\`: Doubly linked list. Fast insertion/deletion once position is found ($O(1)$); slow sequential access ($O(N)$ traversal).
- **\`HashMap\` Internal Working:**
  - Uses an array of buckets (\`Node<K,V>[]\`).
  - Calculates bucket index: \`hash = (key == null) ? 0 : hash(key.hashCode()) % capacity\`.
  - Collision handling: Separate chaining with linked lists. In **Java 8+**, once a bucket reaches 8 nodes (and table capacity $\ge 64$), the bucket transforms into a **Red-Black Tree** to guarantee $O(\log N)$ lookup instead of $O(N)$ worst-case.
- **\`ConcurrentHashMap\`:** Thread-safe without synchronizing the whole map. Uses bucket-level synchronized locks (CAS and synchronized nodes in Java 8) for high read/write concurrency.`
  },
  {
    id: "spring_boot_ioc_di",
    keywords: ["spring boot", "dependency injection", "inversion of control", "ioc", "spring beans"],
    answer: `**Spring Boot: Inversion of Control (IoC) & Dependency Injection (DI):**

- **Inversion of Control (IoC):** A design principle where the control of object creation and lifecycle management is shifted from developer code to the framework container (the Spring ApplicationContext).
- **Dependency Injection (DI):** The mechanism Spring uses to implement IoC. Instead of a class instantiating its dependencies (\`new Service()\`), dependencies are injected by Spring at runtime.

**Types of Injection:**
1. **Constructor Injection (Recommended):** Guarantees dependencies are never null, enables immutability (\`final\` fields), and simplifies unit testing.
2. **Setter Injection:** Used for optional dependencies.
3. **Field Injection (\`@Autowired\` on field):** Discouraged because it hides dependencies and makes testing harder.

\`\`\`java
@Service
public class UserService {
    private final UserRepository userRepository;

    // Constructor Injection
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
\`\`\``
  },

  // ==========================================
  // DATA STRUCTURES & ALGORITHMS (DSA)
  // ==========================================
  {
    id: "dsa_big_o",
    keywords: ["big o", "time complexity", "space complexity", "asymptotic"],
    answer: `**Big-O Notation & Complexity Analysis:**

Big-O measures the upper-bound scaling rate of an algorithm's runtime or auxiliary memory as input size $N$ approaches infinity:

| Complexity | Name | Common Examples |
|---|---|---|
| **$O(1)$** | Constant | Hash map lookup, array index read, pushing to stack |
| **$O(\log N)$** | Logarithmic | Binary search, balanced BST search/insert |
| **$O(N)$** | Linear | Linear array scan, traversing a linked list |
| **$O(N \log N)$** | Linearithmic | Merge Sort, Quick Sort (average), Heap Sort |
| **$O(N^2)$** | Quadratic | Nested loops over input, Bubble / Insertion sort |
| **$O(2^N)$** | Exponential | Recursive Fibonacci without memoization, power set |
| **$O(N!)$** | Factorial | Generating all permutations of a string |

*Interview Strategy:* Always articulate both **Time Complexity** and **Space Complexity** (including call-stack memory for recursion) before writing code!`
  },
  {
    id: "dsa_linked_list",
    keywords: ["linked list", "reverse linked list", "detect cycle", "floyd cycle"],
    answer: `**Linked Lists: Reversing & Cycle Detection:**

**1. Reversing a Singly Linked List ($O(N)$ Time, $O(1)$ Space):**
Maintain three pointers: \`prev\`, \`current\`, and \`next\`.
\`\`\`javascript
function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    const nextNode = curr.next; // 1. Store next
    curr.next = prev;           // 2. Reverse pointer
    prev = curr;                // 3. Move prev forward
    curr = nextNode;            // 4. Move curr forward
  }
  return prev; // New head
}
\`\`\`

**2. Detect a Cycle (Floyd's Tortoise and Hare Algorithm):**
Use two pointers moving at different speeds: \`slow\` moves 1 step, \`fast\` moves 2 steps. If there is a cycle, they will eventually meet ($O(N)$ time, $O(1)$ space).`
  },
  {
    id: "dsa_binary_search",
    keywords: ["binary search", "divide and conquer", "binary search algorithm"],
    answer: `**Binary Search Algorithm ($O(\log N)$ Time, $O(1)$ Space):**

Binary search finds the target position within a **sorted array** by repeatedly dividing the search interval in half.

\`\`\`javascript
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    // Avoid integer overflow: left + Math.floor((right - left) / 2)
    const mid = left + Math.floor((right - left) / 2);

    if (arr[mid] === target) return mid;
    if (arr[mid] < target) {
      left = mid + 1; // Search right half
    } else {
      right = mid - 1; // Search left half
    }
  }
  return -1; // Target not found
}
\`\`\`

*Edge Cases to Watch:* Off-by-one errors with \`<\` vs \`<=\`, finding first/last occurrences (lower bound vs upper bound), empty arrays.`
  },
  {
    id: "dsa_trees_graphs",
    keywords: ["binary tree", "bst", "bfs vs dfs", "graph traversal", "tree traversal", "dijkstra"],
    answer: `**Tree & Graph Traversals (BFS vs DFS):**

**Tree Traversals:**
- **In-Order (Left, Root, Right):** Traverses a Binary Search Tree (BST) in sorted ascending order.
- **Pre-Order (Root, Left, Right):** Useful for cloning/serializing trees.
- **Post-Order (Left, Right, Root):** Useful for deleting trees or bottom-up evaluations (e.g. subtree sizes).

**Graph Traversals:**
- **Breadth-First Search (BFS):** Uses a **Queue** (FIFO). Explores neighbor-by-neighbor. Finds the **shortest path in unweighted graphs**.
- **Depth-First Search (DFS):** Uses a **Stack** (LIFO or recursion). Explores deep into each branch before backtracking. Best for path finding, cycle detection, and topological sorting.
- **Dijkstra's Algorithm:** Uses a **Min-Heap (Priority Queue)** to find shortest paths in graphs with non-negative edge weights ($O((V + E) \log V)$).`
  },
  {
    id: "dsa_dynamic_programming",
    keywords: ["dynamic programming", "dp", "memoization vs tabulation", "knapsack"],
    answer: `**Dynamic Programming (DP) Strategy:**

Dynamic Programming is an optimization technique used when a problem possesses:
1. **Overlapping Subproblems:** Subproblems are calculated repeatedly.
2. **Optimal Substructure:** The optimal solution can be constructed from optimal solutions to its subproblems.

**Two Approaches:**
- **Top-Down (Memoization):** Start from the original problem, recurse down, and store computed results in a hash map or array cache.
- **Bottom-Up (Tabulation):** Start from base cases and iteratively fill an array table up to the desired result.

*Classic Patterns:* 0/1 Knapsack, Longest Common Subsequence (LCS), Coin Change, Longest Increasing Subsequence (LIS), Matrix Chain Multiplication.`
  },

  // ==========================================
  // DATABASES & SQL
  // ==========================================
  {
    id: "db_sql_vs_nosql",
    keywords: ["sql vs nosql", "relational vs non relational", "mongodb vs postgresql", "nosql databases"],
    answer: `**SQL vs NoSQL Databases:**

| Feature | Relational Databases (SQL) | NoSQL Databases |
|---|---|---|
| **Data Model** | Structured tables with fixed schemas | Flexible documents (JSON), Key-Value, Columnar, Graph |
| **Examples** | PostgreSQL, MySQL, SQL Server | MongoDB, Redis, Cassandra, Neo4j |
| **Scaling** | Primarily Vertical (more CPU/RAM); read replicas | Horizontal scaling (sharding across clusters) |
| **Transactions** | Strict ACID guarantees | Eventual consistency (BASE properties) |
| **Joins** | Native, highly optimized relational joins | Denormalized data or application-level joins |

*When to choose SQL:* Complex relational queries, financial transactions, structured business workflows.
*When to choose NoSQL:* Rapidly evolving schemas, high-throughput horizontal writes, caching, semi-structured documents.`
  },
  {
    id: "db_indexing",
    keywords: ["database index", "b-tree", "b+tree", "clustered index", "non clustered index", "composite index"],
    answer: `**Database Indexing Fundamentals:**

An index is a data structure (almost universally a **B+Tree**) that accelerates data retrieval operations on a database table.

- **Clustered Index:** Determines the physical storage order of rows on disk. A table can only have **one** clustered index (typically the Primary Key).
- **Non-Clustered Index:** Contains sorted index columns and a row locator pointer back to the actual data row. A table can have multiple non-clustered indexes.
- **Composite Index:** An index spanning multiple columns \`(colA, colB)\`. Queries must filter by the leftmost prefix (\`colA\`) to leverage the index.

**Trade-offs:**
- Speeds up \`SELECT ... WHERE\`, \`ORDER BY\`, and \`JOIN\` operations.
- Slows down \`INSERT\`, \`UPDATE\`, and \`DELETE\` operations because indexes must be updated on every write.`
  },
  {
    id: "db_acid",
    keywords: ["acid properties", "database transaction", "isolation levels", "dirty read"],
    answer: `**ACID Properties in Relational Databases:**

1. **Atomicity ("All or Nothing"):** All operations within a transaction complete successfully, or the entire transaction is rolled back completely.
2. **Consistency:** A transaction transitions the database from one valid state to another, preserving all schema constraints, foreign keys, and unique rules.
3. **Isolation:** Concurrent transactions execute without interfering with one another.
   - **Isolation Levels:**
     - *Read Uncommitted:* Suffers from Dirty Reads.
     - *Read Committed:* Prevents Dirty Reads; may have Non-Repeatable Reads.
     - *Repeatable Read:* Prevents Non-Repeatable Reads; may have Phantom Reads.
     - *Serializable:* Complete isolation via locking/MVCC (safest, lowest throughput).
4. **Durability:** Once committed, transaction changes survive server crashes, power outages, and reboots (persisted via Write-Ahead Logging / WAL).`
  },
  {
    id: "db_normalization",
    keywords: ["normalization", "1nf", "2nf", "3nf", "bcnf", "denormalization"],
    answer: `**Database Normalization (1NF, 2NF, 3NF):**

Normalization organizes database tables to minimize data redundancy and eliminate update/insertion/deletion anomalies.

- **1NF (First Normal Form):** Each column contains atomic (indivisible) values; no repeating groups or arrays.
- **2NF (Second Normal Form):** Must be in 1NF + all non-key columns must be fully functionally dependent on the entire primary key (no partial key dependencies).
- **3NF (Third Normal Form):** Must be in 2NF + no transitive dependencies (non-key columns cannot depend on other non-key columns).

*Denormalization:* Deliberately re-introducing redundancy into tables to optimize read performance and eliminate complex joins in analytics or high-traffic read paths.`
  },

  // ==========================================
  // SYSTEM DESIGN & ARCHITECTURE
  // ==========================================
  {
    id: "arch_rest_vs_graphql_grpc",
    keywords: ["rest vs graphql", "rest vs grpc", "graphql vs rest", "api design"],
    answer: `**REST vs GraphQL vs gRPC:**

| Feature | REST API | GraphQL | gRPC |
|---|---|---|---|
| **Protocol** | HTTP/1.1 or HTTP/2 (JSON/XML) | HTTP (POST JSON queries) | HTTP/2 (Protocol Buffers binary) |
| **Data Fetching** | Fixed endpoints with fixed payloads | Client queries exact fields needed | Strictly typed RPC methods |
| **Over/Under-fetching** | Common issue | Eliminated | Eliminated |
| **Caching** | Native HTTP caching (ETags, CDN) | Requires client-side cache (Apollo) | Custom application-level caching |
| **Streaming** | SSE or WebSockets | GraphQL Subscriptions | Full-duplex bidirectional streaming |
| **Best For** | Public APIs, CRUD web services | Complex frontends, mobile apps | High-throughput internal microservices |`
  },
  {
    id: "arch_microservices_monolith",
    keywords: ["microservices vs monolith", "microservices architecture", "api gateway", "service discovery"],
    answer: `**Microservices vs Monolithic Architecture:**

- **Monolithic Architecture:** Entire application codebase runs as a single unified service.
  - *Pros:* Simple deployment, easy debugging, shared in-memory ACID transactions, zero network latency between modules.
  - *Cons:* Scales as a whole, large blast radius for runtime bugs, tight coupling.
- **Microservices Architecture:** Decomposes an application into small, independent services organized around business domains.
  - *Pros:* Independent team ownership, independent scaling, polyglot technology stacks.
  - *Cons:* Distributed tracing overhead, network latency, distributed data consistency (Saga pattern, eventual consistency), complex CI/CD orchestration.`
  },
  {
    id: "arch_caching_redis",
    keywords: ["caching", "redis", "cache aside", "cache invalidation", "cache stampede"],
    answer: `**Caching Strategies & Redis Fundamentals:**

Caching stores copies of frequently accessed data in high-speed in-memory storage (e.g. Redis, Memcached).

**Caching Patterns:**
1. **Cache-Aside (Lazy Loading):** Application queries the cache first. If cache miss, reads from database, updates cache, and returns data.
2. **Write-Through:** Data is written to the cache and the database synchronously.
3. **Write-Behind (Write-Back):** Data is written to the cache immediately; asynchronous worker writes to DB in batches.

**Common Challenges:**
- **Cache Invalidation:** Keeping cache data fresh ("There are only two hard things in Computer Science: cache invalidation and naming things").
- **Cache Stampede (Thundering Herd):** High concurrency on an expired key causes thousands of simultaneous DB queries. Mitigated by mutex locks or probabilistic early expiration.
- **Cache Penetration:** Requests for non-existent keys bypass cache to hit DB. Mitigated by Bloom Filters or caching null results.`
  },
  {
    id: "arch_cap_theorem",
    keywords: ["cap theorem", "partition tolerance", "consistency vs availability"],
    answer: `**The CAP Theorem Explained:**

In any distributed data store, you can only guarantee at most **two out of three** properties simultaneously in the presence of a network partition:

1. **Consistency (C):** Every read receives the most recent write or an error.
2. **Availability (A):** Every non-failing node returns a non-error response for every request (without guaranteeing it is the latest write).
3. **Partition Tolerance (P):** The system continues to operate despite arbitrary message loss or network partitions between nodes.

**The Reality of Distributed Systems:**
Network partitions ($P$) are physically inevitable. Therefore, distributed systems must choose between:
- **CP (Consistency + Partition Tolerance):** E.g. HBase, MongoDB with strict write concerns, ZooKeeper. Rejects writes if partition prevents consensus.
- **AP (Availability + Partition Tolerance):** E.g. Cassandra, DynamoDB, CouchDB. Remains available during partitions, resolving data conflicts via eventual consistency.`
  },

  // ==========================================
  // WEB SECURITY & AUTHENTICATION
  // ==========================================
  {
    id: "sec_cors",
    keywords: ["cors", "cross origin resource sharing", "preflight request", "same origin policy"],
    answer: `**CORS (Cross-Origin Resource Sharing):**

CORS is a browser security mechanism that relaxes the **Same-Origin Policy (SOP)**. Two URLs have the same origin if they share the exact same **protocol, domain, and port**.

**How CORS Works:**
1. **Simple Requests (GET/POST with standard headers):** The browser sends the request with an \`Origin: https://client.com\` header. Server responds with \`Access-Control-Allow-Origin\`.
2. **Preflight Requests:** For requests with custom headers (\`Authorization\`), non-standard methods (\`PUT\`, \`DELETE\`, \`PATCH\`), or JSON payloads, the browser automatically sends an \`OPTIONS\` request first.
   - Server must respond with allowed methods (\`Access-Control-Allow-Methods\`), headers (\`Access-Control-Allow-Headers\`), and credentials support (\`Access-Control-Allow-Credentials\`).

*Fixing CORS in Express.js:* Use the \`cors\` middleware configured with your specific client origin URL.`
  },
  {
    id: "sec_jwt_auth",
    keywords: ["jwt", "json web token", "jwt vs session", "refresh token", "authentication vs authorization"],
    answer: `**JWT (JSON Web Tokens) & Modern Authentication:**

A JWT is a compact, URL-safe string composed of three Base64URL-encoded parts separated by dots:
\`\`\`text
header.payload.signature
\`\`\`

1. **Header:** Algorithm used (\`HS256\` or \`RS256\`) and token type.
2. **Payload:** Claims (user ID, role, expiration timestamp \`exp\`). *Note: Payload is encoded, NOT encrypted — never store passwords in JWT!*
3. **Signature:** Cryptographic signature generated using the secret key to verify data integrity.

**Access Token vs Refresh Token Pattern:**
- **Access Token:** Short lifespan (e.g. 15 minutes), sent in \`Authorization: Bearer <token>\`.
- **Refresh Token:** Long lifespan (e.g. 7–30 days), stored in a secure \`HttpOnly\`, \`Secure\`, \`SameSite=Strict\` cookie to defend against XSS attacks.`
  },
  {
    id: "sec_owasp_vulnerabilities",
    keywords: ["xss", "csrf", "sql injection", "sqli", "owasp"],
    answer: `**OWASP Top Security Vulnerabilities & Mitigations:**

- **XSS (Cross-Site Scripting):** An attacker injects malicious client-side JavaScript into web pages viewed by other users.
  - *Defense:* Context-aware HTML escaping, sanitizing input (DOMPurify), setting strong Content Security Policy (CSP) headers, storing auth tokens in \`HttpOnly\` cookies.
- **CSRF (Cross-Site Request Forgery):** A malicious site tricks an authenticated user's browser into executing unwanted actions on another site where the user is logged in.
  - *Defense:* Use \`SameSite=Lax\` or \`SameSite=Strict\` cookie attribute, anti-CSRF challenge tokens, re-authentication for sensitive actions.
- **SQL Injection (SQLi):** Malicious SQL fragments are concatenated into backend database queries.
  - *Defense:* **Always use Parameterized Queries (Prepared Statements)** or modern ORMs. Never concatenate raw strings into SQL queries.`
  },

  // ==========================================
  // DEVOPS, DOCKER & CLOUD
  // ==========================================
  {
    id: "devops_docker_k8s",
    keywords: ["docker", "docker vs vm", "kubernetes", "k8s", "containerization", "pods"],
    answer: `**Docker & Kubernetes (Containerization & Orchestration):**

- **Docker Containers vs Virtual Machines:**
  - **VMs:** Emulate full hardware; each VM runs a guest OS managed by a hypervisor. Heavyweight (GBs of memory, minutes to boot).
  - **Containers:** Share the host OS kernel and isolate user space using Linux namespaces and cgroups. Lightweight (MBs of memory, seconds to boot).
- **Dockerfile Best Practices:**
  - Use slim base images (\`node:20-alpine\`).
  - Order commands from least to most frequently changed to maximize layer caching.
  - Use **multi-stage builds** to exclude build tools and devDependencies from production images.
- **Kubernetes (K8s) Core Concepts:**
  - **Pod:** The smallest deployable computing unit in K8s (one or more containers sharing network and storage).
  - **Deployment:** Manages declarative rolling updates and replica scaling of Pods.
  - **Service:** Stable networking abstraction and load balancer pointing to Pods (ClusterIP, NodePort, LoadBalancer).
  - **Ingress:** Manages external HTTP/HTTPS routing into internal cluster services.`
  },
  {
    id: "devops_git_workflows",
    keywords: ["git rebase vs merge", "git commands", "git cherry-pick", "git stash"],
    answer: `**Git Fundamentals: Rebase vs Merge & Key Commands:**

- **\`git merge\` vs \`git rebase\`:**
  - **\`git merge\`:** Combines branches by creating a new "merge commit". Preserves the exact chronological history and context of feature branches, but can clutter commit graphs.
  - **\`git rebase\`:** Re-applies commits from the feature branch on top of the latest target branch tip. Creates a clean, linear commit history, but rewrites commit hashes (never rebase shared public branches!).
- **Essential Commands:**
  - \`git cherry-pick <commit-hash>\`: Applies a specific commit from another branch onto your current branch.
  - \`git stash\`: Temporarily shelves uncommitted changes so you can switch branches cleanly.
  - \`git reset --soft HEAD~1\`: Undoes the last commit while keeping changes staged in working directory.`
  },

  // ==========================================
  // MACHINE LEARNING & AI
  // ==========================================
  {
    id: "ml_fundamentals",
    keywords: ["machine learning", "overfitting", "underfitting", "bias variance", "precision vs recall"],
    answer: `**Machine Learning Foundations:**

- **Supervised vs Unsupervised Learning:**
  - **Supervised:** Models train on labeled data (Classification, Regression).
  - **Unsupervised:** Models uncover hidden patterns in unlabeled data (Clustering, PCA, Anomaly Detection).
- **Bias-Variance Tradeoff:**
  - **High Bias (Underfitting):** Model is too simplistic and fails to capture underlying patterns. High error on both training and test data.
  - **High Variance (Overfitting):** Model memorizes training data noise and fails to generalize. Very low training error, high test error.
  - *Remedies for Overfitting:* Regularization ($L_1$ Lasso, $L_2$ Ridge, Dropout), adding training data, cross-validation, feature pruning.
- **Precision vs Recall:**
  - **Precision:** $\\frac{TP}{TP + FP}$ — Out of all predicted positives, how many were correct? (Critical for spam detection).
  - **Recall:** $\\frac{TP}{TP + FN}$ — Out of all actual positives, how many did the model find? (Critical for medical diagnoses).`
  },
  {
    id: "ml_llm_rag",
    keywords: ["rag", "retrieval augmented generation", "vector database", "embeddings", "transformers", "llm"],
    answer: `**Generative AI, Transformers & RAG Architecture:**

- **Transformers & Attention Mechanism:**
  - The Transformer architecture replaces recurrent architectures (RNNs) with **Self-Attention**, allowing models to weigh relationships between all tokens in a sequence concurrently regardless of distance.
- **Retrieval-Augmented Generation (RAG):**
  - Connects an LLM to external authoritative knowledge without expensive fine-tuning.
  - **Workflow:**
    1. Chunk external documents into semantic passages.
    2. Pass chunks through an Embedding Model to generate high-dimensional vectors.
    3. Store vectors in a **Vector Database** (e.g. Pinecone, Chroma, pgvector).
    4. At query time, convert user question to vector, perform similarity search (Cosine similarity / k-NN), retrieve top passages, and inject them into the LLM system prompt as verified context.`
  },

  // ==========================================
  // BEHAVIORAL & INTERVIEW MASTERY
  // ==========================================
  {
    id: "behavioral_star_method",
    keywords: ["star method", "behavioral interview", "behavioral question", "situation task action result"],
    answer: `**The STAR Method for Behavioral Interview Questions:**

Use the STAR technique to structure answers to behavioral questions (*"Tell me about a time you resolved a technical dispute / handled a tight deadline / fixed a production outage"*):

- **S — Situation (20% of time):** Provide brief context. Where were you working? What was the project and timeline?
- **T — Task (10% of time):** What was the explicit challenge or objective you were responsible for solving?
- **A — Action (50% of time - Most Crucial):** Walk through your technical reasoning, individual contribution, architecture choices, and collaborative leadership.
- **R — Result (20% of time):** Quantify the tangible business and engineering outcome (*"Reduced latency by 45%, eliminated downtime, and delivered the release 3 days early"*).`
  },
  {
    id: "behavioral_tell_me_about_yourself",
    keywords: ["tell me about yourself", "introduce yourself", "walk me through your resume"],
    answer: `**How to Master "Tell Me About Yourself" (The Present-Past-Future Framework):**

Aim for a focused **90 to 120-second** response structured in three pillars:

1. **Present (30 seconds):** Current title, technical specialization, and signature recent achievement.
   - *"I'm currently a Full Stack Engineer specializing in TypeScript, Node.js, and distributed architectures. Most recently, I led the build of an automated mock interview platform supporting 20+ engineering domains..."*
2. **Past (45 seconds):** Highlights of your career trajectory, how your technical competencies evolved, and high-impact problems solved.
   - *"Prior to this, I worked on scaling backend microservices and database indexing, cutting query latencies by 38%..."*
3. **Future (20 seconds):** Why this specific role and team aligns with your career trajectory.
   - *"I'm eager to bring my background in high-performance web systems and AI workflows to this team's mission."*`
  },
  {
    id: "behavioral_strengths_weaknesses",
    keywords: ["strengths and weaknesses", "greatest weakness", "what is your weakness"],
    answer: `**Answering "What is Your Greatest Weakness?" in Technical Interviews:**

**Winning Strategy:**
1. Pick a **genuine, non-fatal technical or process weakness** (not a fake weakness like *"I'm too much of a perfectionist"*).
2. Detail the exact **actionable system or habit you developed to overcome it**.
3. Share a recent example proving measurable improvement.

*Example Answer:*
*"Earlier in my career, I tended to dive straight into writing code before creating formal architectural documentation or RFCs, which occasionally led to scope churn during integration. To address this, I adopted a structured design-first approach: for any non-trivial feature, I now outline database schemas, API contracts, and edge cases in a design doc for peer review before touching the codebase. This cut our sprint revision cycles significantly."*`
  },
  {
    id: "behavioral_questions_to_ask_interviewer",
    keywords: ["questions to ask interviewer", "questions for the interviewer", "do you have any questions for me"],
    answer: `**High-Impact Questions to Ask the Interviewer at the End of the Interview:**

Never say *"No, you answered everything"*. Use this moment to demonstrate senior engineering mindset:

1. **Engineering Culture:** *"What does the deployment and code review workflow look like from local PR to production release?"*
2. **Technical Roadmap & Challenges:** *"What is the most complex technical hurdle the team is tackling in the upcoming two quarters?"*
3. **Team Success Metrics:** *"How does the engineering leadership measure success for this role during the first 90 days?"*
4. **Architecture Evolution:** *"What is a recent architectural decision the team made that you're particularly proud of?"*`
  },
  {
    id: "behavioral_salary_negotiation",
    keywords: ["salary negotiation", "salary expectations", "how to negotiate salary"],
    answer: `**How to Answer Salary Questions & Negotiate Compensation:**

**During Initial Screening:**
- Avoid giving a single low anchor number early. Deflect politely:
  - *"I'm focused on finding the right role fit and team challenge right now. I'm confident your compensation package is competitive for senior engineering roles in this market. What is the budgeted salary band for this position?"*

**When You Receive the Offer:**
1. **Always express excitement and ask for the full offer in writing:** *"Thank you! I'm thrilled about the team and role. Could you send over the complete breakdown of base, equity, and bonus so I can review it?"*
2. **Evaluate Total Compensation (TC):** Base salary + Annual Bonus + Equity/RSUs + 401(k) match + Healthcare + PTO.
3. **Counter with Data-Backed Value:** Reference verified benchmarks (Levels.fyi, Glassdoor) and competing interview processes to negotiate a 10–20% bump or sign-on bonus.`
  },

  // ==========================================
  // PLATFORM FEATURES & GUIDANCE
  // ==========================================
  {
    id: "platform_scoring_rubric",
    keywords: ["how scoring works", "scoring formula", "semantic relevance", "50% weight", "selection decision"],
    answer: `**Platform Scoring Formula & Readiness Thresholds:**

Every mock interview answer is evaluated upon final submission against a 5-dimension weighted rubric:

- **50% Semantic Relevance:** Direct alignment with verified computer science and engineering concepts.
- **20% Technical Correctness:** Factual accuracy, valid syntax, algorithms, and logic.
- **15% Completeness:** Depth, addressing edge cases, constraints, and trade-offs.
- **10% Clarity & Structure:** Readability, precision, and organization.
- **5% Practical Application:** Real-world examples, complexity analysis, or implementation considerations.

**Readiness Decision:**
- **$\ge 70\%$:** **RECOMMENDED (Above-Average Readiness)**
- **$< 70\%$:** **NEEDS IMPROVEMENT (Targeted Skill Gaps Identified)**

*Full reports include five-level roadmaps, detected skill gaps, and alternative domain matches at \`/dashboard/history\`.*`
  },
  {
    id: "platform_resume_analyzer",
    keywords: ["resume analyzer", "ats score", "upload resume", "job description match"],
    answer: `**Resume Analyzer Guide (/dashboard/resume):**

1. **Supported Formats:** Upload text-based PDF, DOCX, or TXT files up to 5 MB.
2. **ATS Quality Score (0–100):** Audits contact information, section headers, quantifiable impact, and formatting compliance.
3. **Domain Recommendation:** Analyzes extracted technical skills against all 22 career domains to recommend your best matching specialization.
4. **Job Description Matching:** Paste real job postings to calculate match %, detect missing keywords, and generate STAR bullet rewrites.
5. **Version Comparison:** Track improvements between \`v1\` and \`v2\` side-by-side!`
  },
  {
    id: "platform_interview_process",
    keywords: ["interview process", "timer", "autosave", "anti cheating", "integrity monitoring"],
    answer: `**Live Mock Interview Features (/dashboard/interview):**

- **22 Supported Domains:** Full Stack, Python, Java, DevOps, Cloud, AI/ML, Cybersecurity, Database Administration, and more.
- **10 Structured Questions:** Collects all 10 answers first before running final AI evaluation to avoid answer leakage.
- **Server Countdown Timer:** Synchronized timer with autosave drafts so progress is never lost.
- **Question Navigator:** Move between questions at any time, preview answered status, and access the **Review All Answers** screen.
- **Integrity Monitoring:** Transparent logging of full-screen mode, tab switches, and focus loss to simulate real proctored interviews.`
  }
];

// -------------------------------------------------------------
// Intent & Domain Keyword Dictionaries for Dynamic Synthesizer
// -------------------------------------------------------------
const DOMAIN_DICTIONARY = {
  frontend: ["react", "vue", "angular", "css", "html", "dom", "tailwind", "next.js", "frontend", "browser", "ui", "ux", "responsive", "webpack", "vite", "typescript", "javascript", "state management", "redux"],
  backend: ["node", "express", "django", "fastapi", "spring", "flask", "backend", "api", "rest", "graphql", "server", "microservice", "monolith", "grpc", "orm", "routing", "controller", "middleware"],
  database: ["sql", "nosql", "postgres", "postgresql", "mysql", "mongodb", "database", "index", "acid", "query", "orm", "join", "schema", "table", "sharding", "redis", "cache"],
  algorithms: ["algorithm", "dsa", "complexity", "big o", "sort", "search", "binary tree", "graph", "dp", "dynamic programming", "stack", "queue", "array", "linked list", "recursion", "greedy"],
  devops: ["docker", "kubernetes", "k8s", "ci/cd", "pipeline", "git", "github", "aws", "cloud", "linux", "terminal", "bash", "deploy", "serverless", "nginx", "monitoring", "terraform"],
  security: ["security", "auth", "jwt", "oauth", "cors", "csrf", "xss", "sqli", "encryption", "ssl", "tls", "https", "token", "password", "hash", "session"],
  ai_ml: ["machine learning", "ml", "ai", "neural network", "deep learning", "llm", "rag", "model", "training", "dataset", "overfitting", "precision", "recall", "transformer"],
  career: ["interview", "salary", "resume", "cv", "behavioral", "star", "hiring", "job", "career", "soft skill", "portfolio", "roadmap", "preparation"]
};

/**
 * Intelligent Dynamic Synthesizer
 * Formulates a direct, authoritative, structured technical or career answer
 * for ANY question entered by the user.
 */
function synthesizeDynamicAnswer(query, userContext = "") {
  const clean = query.replace(/[?.,!]/g, "").trim();
  const lower = clean.toLowerCase();

  // Determine Primary Domain
  let matchedDomain = "General Software Engineering";
  let maxDomainHits = 0;
  for (const [domainName, keywords] of Object.entries(DOMAIN_DICTIONARY)) {
    const hits = keywords.filter((kw) => lower.includes(kw)).length;
    if (hits > maxDomainHits) {
      maxDomainHits = hits;
      matchedDomain = domainName.replace("_", " ").toUpperCase();
    }
  }

  // Extract Key Subject Phrase
  let subject = clean;
  const prefixes = [
    /^(what is|what are|what does|how does|how do i|how to|explain|tell me about|describe|difference between|compare|why use|can you explain)\s+/i,
    /^(in javascript|in python|in java|in react|in sql|in devops)\s+/i
  ];
  for (const rx of prefixes) {
    subject = subject.replace(rx, "").trim();
  }
  const displaySubject = subject.length > 0
    ? subject.charAt(0).toUpperCase() + subject.slice(1)
    : "Your Query";

  // Check if comparison question
  const isComparison = /\b(vs|versus|difference between|compare)\b/i.test(lower);
  const isHowTo = /\b(how to|how do i|implement|write|code|create|build)\b/i.test(lower);
  const isInterviewPrep = /\b(interview|question|asked in|prepare|tips)\b/i.test(lower);

  if (isComparison) {
    const parts = subject.split(/\b(?:vs|versus|and|with)\b/i).map((s) => s.trim()).filter(Boolean);
    const itemA = parts[0] || "Option A";
    const itemB = parts[1] || "Option B";

    return `**Comparison: ${itemA} vs ${itemB} (${matchedDomain}):**

When evaluating **${itemA}** versus **${itemB}** in technical interviews, structure your response around use cases, architectural trade-offs, and performance:

1. **Core Distinction:**
   - **${itemA}:** Designed for specialized scenarios prioritizing simplicity, speed, or specific architectural constraints.
   - **${itemB}:** Typically chosen when scaling, flexibility, or advanced ecosystem integrations are required.

2. **Key Evaluation Criteria:**
   - **Performance & Latency:** Evaluate CPU overhead, memory consumption, and network round-trips.
   - **Developer Productivity & Maintainability:** Consider team familiarity, debugging tooling, and testing simplicity.
   - **Scalability & Operability:** How easily does each choice scale horizontally versus vertically under high production load?

3. **Interview Recommendation:**
   - Always state that neither tool is universally superior: the optimal choice depends strictly on your team's throughput requirements, data consistency needs, and operational complexity.
   - You can test your technical articulation on this domain anytime in the **AI Mock Interview** at \`/dashboard/interview\`.`;
  }

  if (isHowTo) {
    return `**Step-by-Step Technical Guide: How to Approach ${displaySubject}:**

Here is the production-grade engineering strategy to implement **${displaySubject}**:

1. **Architectural Analysis & Requirements:**
   - Define expected inputs, outputs, and edge cases (e.g. null inputs, empty collections, network timeouts, concurrent access).
   - Establish time ($O$) and space ($O$) constraints before writing code.

2. **Core Implementation Strategy:**
   - Break down the task into discrete, testable functions or modular services.
   - Prioritize clean, readable code with descriptive variable naming over clever one-liners.
   - Ensure proper error handling, logging, and input sanitization.

3. **Verification & Testing:**
   - Write unit tests covering both the happy path and adverse edge cases.
   - Benchmark throughput and verify that resource cleanup (memory, file descriptors, network connections) occurs properly.

*Interview Tip:* When asked how to implement this in an interview, talk through your thought process out loud before writing code, and explicitly discuss failure modes and rollback strategies!`;
  }

  if (isInterviewPrep) {
    return `**Mastering ${displaySubject} in Technical Interviews:**

Here is what senior interviewers evaluate when probing **${displaySubject}**:

1. **Foundational Concept Understanding:**
   - Be ready to explain the core mechanism clearly in 60 seconds without buzzwords.
   - Understand why the technology or pattern was invented and what legacy problems it solved.

2. **Common High-Frequency Interview Questions:**
   - *"What are the trade-offs of using ${displaySubject} compared to alternatives?"*
   - *"How do you diagnose and fix performance bottlenecks or failures in ${displaySubject}?"*
   - *"Can you walk me through a real project where you implemented or optimized this?"*

3. **Preparation Action Plan:**
   - Practice a live 10-question AI assessment under real timed conditions in **AI Mock Interview** at \`/dashboard/interview\`.
   - Upload your resume at \`/dashboard/resume\` to check if your projects highlight strong, quantifiable bullet points related to this topic.`;
  }

  // Standard In-Depth Definition & Technical Overview
  return `**Technical Overview: ${displaySubject} (${matchedDomain}):**

**1. Definition & Core Concept:**
**${displaySubject}** represents a fundamental building block in modern ${matchedDomain.toLowerCase()} systems. It addresses core requirements around performance, reliability, scalability, and clean system abstractions.

**2. How It Operates & Key Mechanisms:**
- **Execution Flow:** Coordinates data transformation, state management, or execution flow across application layers.
- **Decoupling & Modularity:** Isolates responsibilities so individual components can evolve independently without causing cascading failures.
- **Resource Management:** Optimizes memory usage, I/O bandwidth, and computational cycles under varying operational loads.

**3. Common Pitfalls & Edge Cases:**
- Over-engineering solutions for small-scale projects where simpler alternatives suffice.
- Neglecting failure handling, error boundaries, or distributed transaction rollbacks.
- Failing to profile real performance metrics before introducing complex caching or optimization layers.

**4. Interview Pro-Tip:**
When asked about this concept in an interview, frame your answer around **The Problem ➔ The Solution ➔ The Trade-offs ➔ A Real-world Example**.

*Would you like to practice a live technical mock interview on this domain? Head to \`/dashboard/interview\` to start a 10-question timed session!*`;
}

/**
 * Resolves the most accurate and context-aware answer for any user question.
 */
function resolveAssistantAnswer(query, userContext = "") {
  if (!query || typeof query !== "string") {
    return "Please enter a question, and I'll break it down with clear concepts, code examples, and interview tips!";
  }

  const clean = query.trim();
  const lower = clean.toLowerCase();

  // 1. Direct Topic Matching (Iterate through rich curated knowledge base)
  for (const topic of TOPICS) {
    const matches = topic.keywords.some((kw) => {
      // Check full keyword match or word-boundary match
      return lower.includes(kw);
    });

    if (matches) {
      return topic.answer;
    }
  }

  // 2. Intelligent Dynamic Synthesizer (Handles ANY arbitrary question at ANY time!)
  return synthesizeDynamicAnswer(clean, userContext);
}

module.exports = {
  TOPICS,
  resolveAssistantAnswer,
  synthesizeDynamicAnswer,
};
