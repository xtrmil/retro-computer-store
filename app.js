let bankBalance = 0;
let workBalance = 0;
let productsbought;
let canTakeLoan = true;
let laptops = [];

function Laptop(model, price, specs, info, imgUrl) {
    this.model = model;
    this.price = price;
    this.specs = specs;
    this.info = info;
    this.imgUrl = imgUrl;
}

const laptop1 = new Laptop("Siemens PCD-2P 286er", "1500", "Input DC 16.5V/2A, System Floppy with MS-DOS 3.20 & Handbook", "Powerful laptop with qwerty keyboard and inluded OS on floppy (MS-DOS)", "https://www.computer-retro.de/Bilder/Laptops/Siemens%20PCD-2P%20Order%20No%20L22451-Z100-V2%20Input%20DC%2016,5V%202A%20FCC%20ID%20BJ486E557CPP82%20Made%20in%20USA_thumb.jpg");
const laptop2 = new Laptop("LTD LOGI 386SX", "999", "16MHz,4mb Ram,80mb HDD,1.44MB Floppy,230V, incl. Keypad and Handbook", "Semi portable workstation with included external Keypad and Handbook.", "https://www.computer-retro.de/Bilder/Laptops/LTD-LOGI-386SX-16MHz-Laptop-4MB-80MB-HDD-inkl-230V-Anschluss-1,44MB-Floppy-Keypad-Logicraft-Products-MFG-PTE-Model-80-inkl-Handbuch-Tasche-1990_thumb.jpg");
const laptop3 = new Laptop("Vobi 386 SX 20", "2500", "20Mhz CPU,2MB RAM,40MB HDD,Stingray Graphics", "For the users who needs that extra edge with Stingray Graphics.", "https://www.computer-retro.de/Bilder/Laptops/Vobis-Highscreen-386-SX-20-Laptop-80386-20MHz-CPU-2MB-RAM-40MB-HDD-(Type14)-Stingray-Grafik-inkl-Akku-und-Netzteil-Amibios-1989_thumb.jpg");
const laptop4 = new Laptop("Compaq LTE 386s/20", "4999", "20Mhz CPU,2MB RAM, Floppy 1.44MB, 10inch LCD Screen", "Comes with an 10 inch LCD Screen and a floppy drive for for backup of personal files.", "https://www.computer-retro.de/Bilder/Laptops/SO-Compaq-LTE-386s-20-Laptop-Series-2800-FCC-ID-CNT75MAF0-mit-Akku-Netzteil-Tasche-Scharniere-defekt-Intel-80386SX-20MHz-CPU-2MB-RAM-10-LCD-Floppy-1990_thumb.jpg");
const laptop5 = new Laptop("Seiko Epson HX-20", "9999", "A4 Sized, 2x 614kHz Hitatchi 6301 CPU, 16KB RAM, 32KB ROM,4X20 Liquid Crystal Display 120X32 Dots LCD", "A workstation with convenient size (A4), dual CPU and an Liquid Crystal Display.", "https://www.computer-retro.de/Bilder/Laptops/Seiko-Epson-HX-20-Handheld-Computer-PC-Liquid-Crystal-Display-120x32-Dots-Micro-Cassette-Drive-inkl-Expansion-Unit-Serial-No-052289-DC-6V-200mA-Japan_thumb.jpg");

laptops.push(laptop1);
laptops.push(laptop2);
laptops.push(laptop3);
laptops.push(laptop4);
laptops.push(laptop5);

function work(){
    workBalance += 100;
    document.getElementById("workBalance").innerHTML = "Pay: " + workBalance + " SEK";
}

function transferFunds(){
    bankBalance += workBalance;
    workBalance = 0;
    document.getElementById("workBalance").innerHTML = "Pay: " + workBalance + " SEK";
    document.getElementById("bankBalance").innerHTML = "Balance: " + bankBalance + " SEK";
}

function lending(){
    let amount = document.getElementById("loanValue").value;

    if ((amount <= bankBalance * 2) && canTakeLoan){
        alertSuccess(true);
        document.getElementById("infoMessage").innerHTML = "Confirmed loan of: " + amount;
        bankBalance += Number(amount);
        document.getElementById("bankBalance").innerHTML = "Balance: " + bankBalance + " SEK";
        canTakeLoan = false;
    }else{
        alertSuccess(false);
        document.getElementById("infoMessage").innerHTML = "You are not eligible for a loan of: " + amount + " SEK";
    }
}
function getLaptopStats(i){
    document.getElementById("modelImage").src = laptops[i].imgUrl;
    document.getElementById("modelName").innerText = laptops[i].model;
    document.getElementById("info").innerText = laptops[i].info;
    document.getElementById("price").innerText = laptops[i].price;
    document.getElementById("productPrice").innerText = laptops[i].price + " SEK";
    document.getElementById("features").innerText = laptops[i].specs;
}

function buy(){
    price = document.getElementById("price").innerText;

    if (price <= bankBalance){
        alertSuccess(true);
        document.getElementById("infoMessage").innerHTML = "You successfully bought a new Laptop for: " + price + " SEK";
        bankBalance -= price;
        document.getElementById("bankBalance").innerHTML = "Balance: " + bankBalance + " SEK";
        canTakeLoan = true;
    }else{
        alertSuccess(false);
        document.getElementById("infoMessage").innerHTML = "You dont have enough money, get back to work.";
    }
}

function closeAll(){
    $('#buyModal').modal('hide');
    $('#loanModal').modal('hide');
}

function alertSuccess(succeeded){
    document.getElementById("infoHeader").classList = "";
    if (succeeded) {
        document.getElementById("infoState").innerText = "Success:Approved";
        document.getElementById("infoHeader").classList = "modal-header alert-success";
    }else{
        document.getElementById("infoState").innerText = "Error: Not Approved";
        document.getElementById("infoHeader").classList = "modal-header alert-danger";
    }
}

setInputFilter(document.getElementById("loanValue"), function(value) {
    return /^\d*\.?\d*$/.test(value);
  });

