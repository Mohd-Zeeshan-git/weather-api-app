// utils/stringSimilarity.js

// 1️⃣ Normalize string (remove spaces, lowercase, trim)
function normalize(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '')
}

// 2️⃣ Levenshtein Distance (Optimized Version)
export function levenshteinDistance(a, b) {
  a = normalize(a)
  b = normalize(b)

  const rows = a.length + 1
  const cols = b.length + 1

  const matrix = Array.from({ length: rows }, () =>
    new Array(cols).fill(0)
  )

  for (let i = 0; i < rows; i++) matrix[i][0] = i
  for (let j = 0; j < cols; j++) matrix[0][j] = j

  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1

      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // deletion
        matrix[i][j - 1] + 1,      // insertion
        matrix[i - 1][j - 1] + cost // substitution
      )
    }
  }

  return matrix[rows - 1][cols - 1]
}

// 3️⃣ Final Similarity Score (0 → 1)
export function calculateSimilarity(a, b) {
  const normA = normalize(a)
  const normB = normalize(b)

  if (!normA || !normB) return 0

  // Prefix Boost (very important for autocomplete UX)
  const prefixBoost = normB.startsWith(normA) ? 0.3 : 0

  const distance = levenshteinDistance(normA, normB)
  const maxLength = Math.max(normA.length, normB.length)

  const similarityScore = 1 - distance / maxLength

  // Weighted score
  return Math.min(similarityScore + prefixBoost, 1)
}

