
export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { gmail, prefix, count } = req.body || {};

  if (
    typeof gmail !== "string" ||
    !/^[^@]+@gmail\.com$/i.test(gmail.trim())
  ) {
    return res.status(400).json({ error: "Gmail tidak valid" });
  }

  const n = Number(count);

  if (!Number.isInteger(n) || n < 1 || n > 100) {
    return res.status(400).json({ error: "Jumlah 1-100" });
  }

  const base = gmail.trim().split("@")[0].split("+")[0];
  const tag = String(prefix || "alias")
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 20) || "alias";

  const aliases = [];

  for (let i = 1; i <= n; i++) {
    aliases.push(`${base}+${tag}${i}@gmail.com`);
  }

  return res.status(200).json({ aliases });
}
