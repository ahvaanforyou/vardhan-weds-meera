/* eslint-disable @typescript-eslint/no-require-imports -- the prebuild script registers Node loaders for the existing TypeScript configuration and static image imports. */
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");
const ts = require("typescript");

const projectRoot = path.resolve(__dirname, "..");
const publicImages = path.join(projectRoot, "public", "images");

require.extensions[".ts"] = (module, filename) => {
  const source = fs.readFileSync(filename, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  });
  module._compile(outputText, filename);
};

for (const extension of [".jpeg", ".jpg", ".png"]) {
  require.extensions[extension] = (module, filename) => {
    module.exports = { src: `/images/${path.basename(filename)}` };
  };
}

const { weddingConfig } = require(path.join(projectRoot, "src", "data", "wedding-data.ts"));

const WIDTH = 1200;
const HEIGHT = 630;
const COLORS = {
  maroon: "#6D1429",
  deepMaroon: "#4A0B1A",
  gold: "#C9A45C",
  paleGold: "#E3C98A",
  ivory: "#FFF8E9",
};

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function wrapWords(value, maxLength) {
  const lines = [];
  let line = "";

  for (const word of value.split(/\s+/)) {
    const nextLine = line ? `${line} ${word}` : word;
    if (nextLine.length > maxLength && line) {
      lines.push(line);
      line = word;
    } else {
      line = nextLine;
    }
  }

  if (line) lines.push(line);
  return lines;
}

function imagePath(staticImage) {
  return path.join(projectRoot, "public", staticImage.src.replace(/^\/+/, ""));
}

function cardShape(x, y, width, height) {
  const archHeight = 92;
  const shoulder = 54;
  const center = x + width / 2;
  return [
    `M ${x} ${y + height}`,
    `V ${y + archHeight}`,
    `C ${x} ${y + shoulder} ${x + width * 0.2} ${y} ${center} ${y}`,
    `C ${x + width * 0.8} ${y} ${x + width} ${y + shoulder} ${x + width} ${y + archHeight}`,
    `V ${y + height}`,
    "Z",
  ].join(" ");
}

async function createArchedPortrait(filePath, width, height) {
  const resized = await sharp(filePath)
    .rotate()
    .resize(width, height, { fit: "cover", position: sharp.strategy.attention })
    .png()
    .toBuffer();

  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><path d="M 0 ${height} V 96 C 0 40 ${width * 0.2} 0 ${width / 2} 0 C ${width * 0.8} 0 ${width} 40 ${width} 96 V ${height} Z" fill="#fff"/></svg>`,
  );

  return sharp(resized)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();
}

function svgOverlay({ brideName, groomName, weddingDate, weddingTime, message, venueName, venueCity }) {
  const cardWidth = 178;
  const cardHeight = 476;
  const cardY = 76;
  const cardXs = [40, 238];
  const innerWidth = 162;
  const photoHeight = 350;
  const photoTop = cardY + 9;
  const messageLines = wrapWords(message, 64).slice(0, 2);
  const escapedMessage = messageLines.map(escapeXml);

  const cards = cardXs
    .map((x) => `<path d="${cardShape(x, cardY, cardWidth, cardHeight)}" fill="${COLORS.ivory}" stroke="${COLORS.gold}" stroke-width="3"/>`)
    .join("");
  const frames = cardXs
    .map((x, index) => {
      const photoX = x + 8;
      const photoY = photoTop;
      const name = index === 0 ? brideName : groomName;
      const role = index === 0 ? "THE BRIDE" : "THE GROOM";
      return `<path d="${cardShape(photoX, photoY, innerWidth, photoHeight)}" fill="none" stroke="${COLORS.paleGold}" stroke-width="2"/><text x="${x + cardWidth / 2}" y="${cardY + 388}" class="portrait-name">${escapeXml(name)}</text><text x="${x + cardWidth / 2}" y="${cardY + 406}" class="portrait-role">${role}</text><path d="M ${x + 64} ${cardY + 422} H ${x + 114}" stroke="${COLORS.gold}" stroke-width="1.5"/><path d="M ${x + 87} ${cardY + 422} l 2 2 -2 2 -2 -2z" fill="${COLORS.gold}"/>`;
    })
    .join("");
  const messageSvg = escapedMessage
    .map((line, index) => `<text x="815" y="${466 + index * 26}" class="message">${line}</text>`)
    .join("");

  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
      <style>
        text { text-anchor: middle; }
        .portrait-name { fill: ${COLORS.deepMaroon}; font-family: Georgia, 'Times New Roman', serif; font-size: 13px; font-weight: 700; }
        .portrait-role { fill: ${COLORS.maroon}; font-family: Georgia, serif; font-size: 10px; font-weight: 600; letter-spacing: 1.2px; }
        .eyebrow { fill: ${COLORS.paleGold}; font-family: Georgia, serif; font-size: 16px; font-weight: 700; letter-spacing: 4px; }
        .names { fill: ${COLORS.ivory}; font-family: Georgia, 'Times New Roman', serif; font-size: 43px; font-weight: 600; }
        .ampersand { fill: ${COLORS.paleGold}; font-family: Georgia, serif; font-size: 27px; }
        .date { fill: ${COLORS.paleGold}; font-family: Georgia, serif; font-size: 31px; font-weight: 600; }
        .time { fill: ${COLORS.ivory}; font-family: Georgia, serif; font-size: 22px; }
        .message { fill: ${COLORS.ivory}; font-family: Georgia, serif; font-size: 18px; }
        .venue { fill: ${COLORS.paleGold}; font-family: Georgia, serif; font-size: 16px; letter-spacing: 1px; }
      </style>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="${COLORS.maroon}"/>
      <rect x="17" y="17" width="1166" height="596" rx="18" fill="none" stroke="${COLORS.gold}" stroke-width="2"/>
      <rect x="25" y="25" width="1150" height="580" rx="13" fill="none" stroke="${COLORS.paleGold}" stroke-width="1" opacity="0.7"/>
      <path d="M 42 66 V 42 H 66 M 1134 42 H 1158 V 66 M 42 564 V 588 H 66 M 1134 588 H 1158 V 564" fill="none" stroke="${COLORS.gold}" stroke-width="2"/>
      ${cards}
      <path d="M 438 91 V 539" fill="none" stroke="${COLORS.gold}" stroke-width="1.5" opacity="0.65"/>
      ${frames}
      <text x="815" y="151" class="eyebrow">WEDDING INVITATION</text>
      <text x="815" y="218" class="names">${escapeXml(groomName)}</text>
      <text x="815" y="258" class="ampersand">&amp;</text>
      <text x="815" y="309" class="names">${escapeXml(brideName)}</text>
      <path d="M 665 339 H 965 M 806 339 l 9 -5 9 5 -9 5z" fill="none" stroke="${COLORS.gold}" stroke-width="1.5"/>
      <text x="815" y="386" class="date">${escapeXml(weddingDate)}</text>
      <text x="815" y="422" class="time">${escapeXml(weddingTime)}</text>
      ${messageSvg}
      <text x="815" y="548" class="venue">${escapeXml(venueName)} · ${escapeXml(venueCity)}</text>
    </svg>
  `);
}

async function generate() {
  const { bride, groom } = weddingConfig.couple;
  const { width: previewWidth, height: previewHeight } = { width: WIDTH, height: HEIGHT };
  const weddingDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: weddingConfig.weddingDateTime.timezone,
  }).format(new Date(weddingConfig.weddingDateTime.iso));

  const photoWidth = 162;
  const photoHeight = 350;
  const photoTop = 85;
  const photoLefts = [48, 246];
  const [bridePhoto, groomPhoto] = await Promise.all([
    createArchedPortrait(imagePath(bride.image), photoWidth, photoHeight),
    createArchedPortrait(imagePath(groom.image), photoWidth, photoHeight),
  ]);
  const ganesha = await sharp(imagePath(weddingConfig.images.ganeshaEmblem))
    .resize(45, 45, { fit: "contain" })
    .png()
    .toBuffer();

  const imageBuffer = await sharp({
    create: {
      width: previewWidth,
      height: previewHeight,
      channels: 3,
      background: COLORS.maroon,
    },
  })
    .composite([
      {
        input: svgOverlay({
          brideName: bride.name,
          groomName: groom.name,
          weddingDate,
          weddingTime: weddingConfig.weddingDateTime.muhurthamTime,
          message: weddingConfig.socialPreviewMessage,
          venueName: weddingConfig.venue.name,
          venueCity: weddingConfig.venue.city,
        }),
      },
      { input: bridePhoto, left: photoLefts[0], top: photoTop },
      { input: groomPhoto, left: photoLefts[1], top: photoTop },
      { input: ganesha, left: 792, top: 67 },
    ])
    .jpeg({ quality: 91, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toBuffer();

  const digest = crypto.createHash("sha256").update(imageBuffer).digest("hex").slice(0, 12);
  const filename = `social-preview-${digest}.jpeg`;
  const outputPath = path.join(publicImages, filename);
  const manifestPath = path.join(projectRoot, "src", "data", "social-preview.generated.json");

  fs.writeFileSync(outputPath, imageBuffer);
  fs.writeFileSync(
    manifestPath,
    `${JSON.stringify({ src: `/images/${filename}`, width: WIDTH, height: HEIGHT }, null, 2)}\n`,
  );

  for (const oldFile of fs.readdirSync(publicImages)) {
    if (/^social-preview-[a-f0-9]{12}\.jpeg$/.test(oldFile) && oldFile !== filename) {
      fs.unlinkSync(path.join(publicImages, oldFile));
    }
  }

  console.log(`Generated ${path.relative(projectRoot, outputPath)} (${WIDTH}x${HEIGHT})`);
}

generate().catch((error) => {
  console.error("Failed to generate the social preview image:", error);
  process.exitCode = 1;
});
