let cart={};

let products=[
  {name:"Samosa",price:20,category:"foods",img:"samosa.webp"},
  {name:"Vada Pav",price:25,category:"foods",img:"vadapavspe.jpg"},
  {name:"Pizza",price:120,category:"foods",img:"pizza...jpeg"},
  {name:"Burger",price:60,category:"foods",img:"burger.jpeg"},
  {name:"Milkshake",price:70,category:"drinks",img:"milkshake.jpeg"},
  {name:"Faluda",price:90,category:"drinks",img:"faluda.jpeg"},
  {name:"Cold Coffee",price:60,category:"drinks",img:"cofee.jpg"}
];

let productList=document.getElementById("productList");

function renderProducts(filter){
  productList.innerHTML="";
  products.forEach(p=>{
    if(filter==="all" || p.category===filter){
      let div=document.createElement("div");
      div.className="product";
      div.innerHTML=`<img src="${p.img}">
      <h4>${p.name}</h4>
      <p>₹${p.price}</p>
      <div class="qty">
      <button onclick="changeQty('${p.name}',${p.price},-1)">−</button>
      <span id="${p.name}">${cart[p.name]?cart[p.name].qty:0}</span>
      <button onclick="changeQty('${p.name}',${p.price},1)">+</button>
      </div>`;
      productList.appendChild(div);
    }
  });
}

// initial render
renderProducts("all");

function filterCategory(cat){
  renderProducts(cat);
}

function changeQty(name,price,delta){
  if(!cart[name]) cart[name]={price,qty:0};
  cart[name].qty+=delta;
  if(cart[name].qty<0) cart[name].qty=0;
  let span=document.getElementById(name);
  if(span) span.innerText=cart[name].qty;
}

function showBill(){
  let billText="";
  let total=0;
  for(let i in cart){
    if(cart[i].qty>0){
      let amt=cart[i].qty*cart[i].price;
      total+=amt;
      billText+=`${i} x${cart[i].qty} = ₹${amt}\n`;
    }
  }
  if(total===0){alert("Cart is empty"); return;}
  billText+="\nTotal: ₹"+total+"\n\n📍 Address:";
  document.getElementById("billText").innerText=billText;
  document.getElementById("billPopup").style.display="flex";
}

function closeBill(){
  document.getElementById("billPopup").style.display="none";
}

function sendOrder(){
  let bill=document.getElementById("billText").innerText;
  let service=document.getElementById("serviceSelect").value;
  let encoded=encodeURIComponent(bill);

  if(service==="whatsapp"){
    window.open("https://wa.me/919356296885?text="+encoded);
  }else if(service==="telegram"){
    window.open("https://t.me/share/url?text="+encoded);
  }else if(service==="email"){
    window.location.href="mailto:sadulwarsai9@gmail.com?subject=GABS Mart Order&body="+encoded;
  }else{
    alert(
`AUTO CHAT NOT SUPPORTED ❌

ENGLISH: Copy bill or take screenshot & send on Instagram.
HINDI: Bill copy kare ya screenshot leke Instagram par bheje.
MARATHI: Bill copy kara kinva screenshot gheun Instagram var pathva.`
    );
    window.open("https://instagram.com/steven.fx_29","_blank");
  }
  closeBill();
}
