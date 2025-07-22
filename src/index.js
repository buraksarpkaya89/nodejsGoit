const fsPromises = require("node:fs/promises")



const message = 'Hello world';

console.log(message);
console.log("object");

//PATH MODULÜ

const path = require("node:path")
console.log(__filename);
console.log(__dirname);
const parsed = path.parse("/users/burak/deneme.txt")
console.log(parsed);

const joined = path.join("/users", "/burak", "deneme.txt","..")
console.log(joined);

// FS MODULÜ

const fs = require("node:fs")

//dosya okuma - 1 
try {
    const data = fs.readFileSync("deneme.txt", "utf8")
    console.log(data);
} catch (error) {
    console.log("hata");
}
//dosya okuma - 2

fs.readFile("deneme.txt","utf8",(err,data) => {
    if(err){
        console.log(err.message);
        return;
    }
    console.log(data);
})

//dosya yazma - 1 
try {
    fs.writeFileSync("goit.txt", "Fullstack developer")
    console.log("dosya yazıldı");
} catch (error) {
    console.log(error.message);
}

// dosya yazma - 2
fs.writeFile("goit2.txt","Frontend Developer",(err) => {
    if(err){
        console.log(err.message);
        return
    }
    console.log("dosya yazıldı2");
})

// dosya kontrolü
const check = fs.existsSync("goit3.txt")
console.log(check);

//klasör oluşturma

try {
    fs.mkdirSync("yeniklasor")
} catch (error) {
    console.log(error.message);
}

// dosya silme

try {
    fs.unlinkSync("goit.txt")

} catch (error) {
    console.log("hata");
}

// klasör silme

try {
    fs.rmdirSync("yeniklasor")
} catch (error) {
    console.log("object");
}
// dosya bilgisi isteme

try {
    const stats = fs.statSync("goit2.txt")
    console.log(stats);
} catch (error) {
    console.log("hata");
}

//promises yapısı ile dosya yazma


// (
//     async () => {
//         const data = "Bu dosyaya yazı yazıyorum";
//         try {
//             await fsPromises.writeFile("deneme.txt", data, "utf8")
//             console.log("veriler başarıyla yazıldı");
//         } catch (error) {
//             console.log("hata",error.message);
//         }
//     }
// )()

// isim yenileme

(async () => {
  try {
    await fsPromises.rename('deneme1.txt', 'goit3.txt');
    console.log('Dosya veya dizin başarıyla yeniden adlandırıldı veya taşındı.');
  } catch (err) {
    console.error('Yeniden adlandırma veya taşıma hatası:', err);
  }
})();






