// Superforms' public adapter barrel imports every optional validation adapter.
// Vite 8/Rolldown validates those optional imports before tree-shaking, so this
// app aliases the documented adapter path to the Zod-only adapter surface we use.
export { zod as zod4 } from "../../../../../node_modules/sveltekit-superforms/dist/adapters/zod4.js";
