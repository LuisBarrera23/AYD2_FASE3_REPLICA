const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const nameBucket = "ayd2-g4"
const conection_s3 = new S3Client({
    region: "us-east-2",
    credentials: {
        accessKeyId: "AKIA47CRUTASHPAFPVGA",
        secretAccessKey: "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",
    },
});

var saveImage = async (base64) => {

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0');

    const fecha = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;

    let buff;

    if (base64.startsWith('data:image/jpeg;base64,')) {
        buff = Buffer.from(base64.split(',')[1], 'base64');
    } else if (base64.startsWith('data:image/png;base64,')) {
        buff = Buffer.from(base64.split(',')[1], 'base64');
    } else {
        buff = Buffer.from(base64, 'base64');
    }

    const params = {
        Bucket: nameBucket,
        Key: `Fotos/${fecha}.jpg`,
        Body: buff,
        ContentType: 'image/jpeg',
    };

    try {
        await conection_s3.send(new PutObjectCommand(params));
        const imageUrl = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
        return imageUrl;
    } catch (err) {
        console.error(err);
    }
};

module.exports = { saveImage }