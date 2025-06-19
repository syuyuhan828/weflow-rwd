import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CSSPlugin } from 'gsap/CSSPlugin';
import { CSS3DRenderer, CSS3DObject } from 'three-css3d';

gsap.registerPlugin(CSSPlugin, ScrollTrigger);


document.querySelector(".IMG").style.display = "none";
const w = window.innerWidth;
const h = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerWidth, 1, 1000);
camera.position.set(0, 0, 500);

const renderer = new CSS3DRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.position = "fixed";
renderer.domElement.style.top = 0;
renderer.domElement.style.left = 0;
document.body.appendChild(renderer.domElement);


const firstImg = document.querySelector(".firstImg");
const firstClone = firstImg.cloneNode(true);
firstClone.style.objectFit = "cover";
// firstClone.style.border = "4px solid #f00";
const firstObj = new CSS3DObject(firstClone)
firstObj.position.set(0, 0, 0);
scene.add(firstObj);
const firstZoffset = firstObj.position.z - camera.position.z;



const lastImg = document.querySelector(".lastImg");
const lastClone = lastImg.cloneNode(true);
lastClone.style.objectFit = "cover";
const lastObj = new CSS3DObject(lastClone);

lastObj.position.set(0, 0, -100);
const lastZoffset = lastObj.position.z - camera.position.z;
scene.add(lastObj)

// 因為.IMG的關係所以目前圖的右上角會訂在畫面中心(以解決)

// 兔子圖片
const rabbitImg = document.querySelector(".rabbitImg");
const rabbitImgClone = rabbitImg.cloneNode(true);
rabbitImgClone.style.position = "fixed";
rabbitImgClone.style.transformOrigin = "bottom left";
const rabbitImgObj = new CSS3DObject(rabbitImgClone);
rabbitImgObj.position.set(0, 0, 100);
const rabbitRect = 
rabbitImgClone.getBoundingClientRect();
const rabbitW = rabbitRect.width;
const rabbitH = rabbitRect.height;

if (w <= 768){
    rabbitImgObj.position.set(
        -w / 18 + rabbitW,   // x 貼左邊
        -h / 6 + rabbitH /20,   // y 貼底部
        10
    );
} else if (w < 1024 && w > 768){
    rabbitImgObj.position.set(
        -w / 50 + rabbitW,   // x 貼左邊
        -h / 5 + rabbitH / 20,   // y 貼底部
        10
    )
} else if (w <= 1200 && w >=1024){
    rabbitImgObj.position.set(
        -w / 100 + rabbitW,   // x 貼左邊
        -h / 3.6 + rabbitH / 20,   // y 貼底部
        10 
    )
} else if (w > 1200){
    rabbitImgObj.position.set(
        -w / 100 + rabbitW + 20,   // x 貼左邊
        -h / 2.3 + rabbitH / 20,   // y 貼底部
        10
    )
}

//  w: 

const rabbitImgZoffset = rabbitImgObj.position.z - camera.position.z;

scene.add(rabbitImgObj);


let floatTween = null;  // 全域變數儲存浮動畫

function startFloat() {
    // 如果已經在浮動，就不要再開一個動畫
    if (floatTween) return;

    floatTween = gsap.to(rabbitImgObj.position, {
        x: "+=20",
        y: "+=25",
        yoyo: true,
        repeat: -1,
        duration: 2,
        ease: "power1.inOut"
    });
}
startFloat();

function stopFloat() {
    if (floatTween) {
        floatTween.kill();
        floatTween = null;
    }
}




// slogan圖片
const sloganImg = document.querySelector(".sloganImg");
const sloganImgClone = sloganImg.cloneNode(true);
sloganImgClone.style.position = "fixed";
const sloganImgObj = new CSS3DObject(sloganImgClone);
const sloganRect = sloganImgClone.getBoundingClientRect();
const imgW = sloganRect.width;
const imgH = sloganRect.height;

if (w <= 768){
    sloganImgObj.position.set(
        -w / 10 + imgW,   // x 貼左邊
        -h / 5 + imgH / 20,   // y 貼底部
        10
    );
} else if (w < 1024 && w > 768){
    sloganImgObj.position.set(
        -w / 50 + imgW,   // x 貼左邊
        -h / 7 + imgH / 20,   // y 貼底部
        10
    )
} else if (w <= 1200 && w >=1024){
    sloganImgObj.position.set(
        -w / 20 + imgW,   // x 貼左邊
        -h / 5 + imgH / 20,   // y 貼底部
        10 
    )
} else if (w > 1200){
    sloganImgObj.position.set(
        -w / 7 + imgW,   // x 貼左邊
        -h / 4 + imgH / 20,   // y 貼底部
        10
    )
}

scene.add(sloganImgObj);
gsap.from(sloganImgObj.element, {
    opacity: 0,
    duration: 1.2,
    ease: "back out(2.0)",
})

gsap.from(sloganImgObj.scale, {
    x: 0.5,
    y: 0.5,
    z: 1,
    duration: 1.2,
    ease: "back.out(2.0)"
});

gsap.to(sloganImgObj.element, {
    filter: "drop-shadow(0 0 20px #00fff0)",
    duration: 1,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
    delay: 1,
    onUpdate: () =>{
        sloganImgObj.position.z = camera.position.z + sloganZoffset;
    }
})


const sloganZoffset = sloganImgObj.position.z - camera.position.z;

let z_max = 500;
let z_min = 0;
ScrollTrigger.create({
    trigger: ".scrollController",
    start: "top top",
    end: "top+=300vh",
    scrub: 1,
    onUpdate: (self) =>{
        const progress = self.progress;
        const z = z_max - progress * (z_max - z_min);
        camera.position.set(0, 0, z);
        lastObj.position.z = camera.position.z + lastZoffset;
        
        const rotationRadian = progress * Math.PI * 2;
        rabbitImgObj.rotation.z = rotationRadian;
    }
})

gsap.to(rabbitImgObj.rotation, {
    z: Math.PI * 2,
    scrollTrigger: {
        trigger: ".scrollController",
        start: "top top",
        end: "top+=300vh",              
        scrub: 1,
        // markers: true             
    },
    onUpdate: () => {
        rabbitImgObj.position.z = camera.position.z + rabbitImgZoffset
    }
});

const aboutUs = document.querySelector(".aboutUsSection");
const aboutUsClone = aboutUs.cloneNode(true);
aboutUsClone.style.position = "fixed";
// aboutUsClone.style.opacity = 0;
aboutUsClone.style.width = "40vw";
aboutUsClone.style.height = "40vh";
aboutUsClone.style.color = "white";
aboutUsClone.style.letterSpacing = "2px";
aboutUsClone.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"

//內部文字:
const aboutUsh2 = aboutUsClone.querySelector("h2"
);
aboutUsh2.style.fontSize = "7vw";
aboutUsh2.style.margin = "0 0 3vh";
const aboutUsh4 = aboutUsClone.querySelector("h4");
aboutUsh4.style.margin = "1vh 0 0";
aboutUsh4.style.fontSize = "24px";
const aboutUsp = aboutUsClone.querySelector("p");
aboutUsp.style.margin = "1vh 0 0"

aboutUsh2.style.opacity = 0;
aboutUsh4.style.opacity = 0;
aboutUsp.style.opacity = 0;


//設定aboutUs 位置
const aboutUsObj = new CSS3DObject(aboutUsClone);
if (w <= 768){
    aboutUsh2.style.fontSize = "7vw";
    aboutUsh2.style.fontWeight = "900";
    aboutUsh4.style.fontSize = "4vw";
    aboutUsp.style.fontSize = "10px";
    aboutUsp.style.lineHeight = "12px";
    aboutUsObj.position.set(
        -w / 40,
        -h / 15,
        1,
    )
} else if (w < 1024 && w > 768){
    aboutUsp.style.fontSize = "14px";
    aboutUsp.style.lineHeight = "16px";
    aboutUsObj.position.set(
        -w / 50, 
        -h / 14,   
        1,
    )
} else if (w <= 1200 && w >=1024){
    aboutUsh4.style.fontSize = "24px";
    aboutUsh4.style.fontWeight = "900";
    aboutUsp.style.fontSize = "18px";
    aboutUsp.style.lineHeight = "24px";
    aboutUsObj.position.set(
        -w / 10,   
        -h / 12,   
        1,
    )
} else if (w > 1200){
    aboutUsh4.style.fontSize = "24px";
    aboutUsh4.style.fontWeight = "900";
    aboutUsp.style.fontSize = "18px";
    aboutUsp.style.lineHeight = "24px";
    // aboutUsObj.position.set(-200, -10, 0);
    aboutUsObj.position.set(
        -w / 7,   
        -h / 12,   
        1,
    )
}
scene.add(aboutUsObj);
const aboutUsObjZOffset = aboutUsObj.position.z - camera.position.z;

// iceCream position
const iceCreamPlanetImg = document.querySelector(".iceCreamPlanet")
const iceCreamPlanetClone = iceCreamPlanetImg.cloneNode(true);
iceCreamPlanetClone.style.position = "fixed";
iceCreamPlanetClone.style.width = "80vw";
const iceCreamPlanetObj = new CSS3DObject(iceCreamPlanetClone);
scene.add(iceCreamPlanetObj)
const iceCreamZOffset = iceCreamPlanetObj.position.z - camera.position.z;

if (w <= 768){
    iceCreamPlanetObj.position.set(
        w / 6,
        -h / 3.5, 
        0,
    )
} else if (w < 1024 && w > 768){
    iceCreamPlanetObj.position.set(
        w / 5,
        -h / 3.5, 
        0,
    )
} else if (w <= 1200 && w >=1024){
    iceCreamPlanetObj.position.set(
        w / 2.5,
        -h / 3, 
        0,
    )
} else if (w > 1200){
    iceCreamPlanetObj.position.set(
        w / 2,
        -h / 3, 
        0,
    )
}

function iceCreamFloat(){
    gsap.to(iceCreamPlanetObj.position, {
        x: "+=10",
        y: "+=25",
        duration: 5,
        yoyo: true,
        repeat: -1,
    })
}
iceCreamFloat();


// 400~950vh
gsap.fromTo(iceCreamPlanetObj.element, 
    { opacity: 0, visibility: "hidden" },
    {
        opacity: 1,
        visibility: "visible",
        scrollTrigger: {
            trigger: ".scrollController",
            start: "top+=400vh",
            end: "top+=450vh",
            scrub: true,
            onUpdate: () => {
                iceCreamPlanetObj.position.z = camera.position.z + iceCreamZOffset;
            }
        }
    }
);

gsap.fromTo(iceCreamPlanetObj.element, 
    {opacity: 1},
    {
        opacity: 0,
        scrollTrigger: {
            trigger: ".scrollController",
            start: "top+=900vh",
            end: "top+=950vh",
            scrub: true,
            onUpdate: () => {
                iceCreamPlanetObj.position.z = camera.position.z + iceCreamZOffset;
            }
        }
    }
)



// animation logistic


// 300~450vh的時候讓白癡兔子滾到右上角
const rabbitInitX = rabbitImgObj.position.x;
const rabbitInitY = rabbitImgObj.position.y;
if ( w <= 768){
    gsap.fromTo(rabbitImgObj.position, 
    {x: rabbitInitX, y: rabbitInitY, scale:rabbitImgObj.scale}, 
    {
        x: rabbitInitX + w / 6,
        y: rabbitInitY + h / 8,
        scale: 2.5,
        scrollTrigger: {
            trigger: ".scrollController",
            start: "top+=300vh",
            end: "top+=500vh",
            scrub: true,
            // markers: true,
            onEnter: () => { stopFloat(); ScrollTrigger.refresh(); },
            onLeave: () => { startFloat(); },
            onEnterBack: () => { stopFloat(); },
            onLeaveBack: () => { startFloat(); },
        },
        // invalidateOnRefresh: true 
    }
    )

} else if (w > 768 && w <= 1024){
    gsap.fromTo(rabbitImgObj.position, 
    {x: rabbitInitX, y: rabbitInitY, scale:rabbitImgObj.scale}, 
    {
        x: rabbitInitX + w / 6,
        y: rabbitInitY + h / 8,
        scale: 1.5,
        scrollTrigger: {
            trigger: ".scrollController",
            start: "top+=300vh",
            end: "top+=500vh",
            scrub: true,
            // markers: true,
            onEnter: () => { stopFloat(); ScrollTrigger.refresh(); },
            onLeave: () => { startFloat(); },
            onEnterBack: () => { stopFloat(); },
            onLeaveBack: () => { startFloat(); },
        }, 
    }
    )
} else if (w > 1024 && w <= 1200){
    gsap.fromTo(rabbitImgObj.position, 
    {x: rabbitInitX, y: rabbitInitY, scale:rabbitImgObj.scale}, 
    {
        x: rabbitInitX + w / 6,
        y: rabbitInitY + h / 8,
        scale: 1.5,
        scrollTrigger: {
            trigger: ".scrollController",
            start: "top+=300vh",
            end: "top+=500vh",
            scrub: true,
            // markers: true,
            onEnter: () => { stopFloat(); ScrollTrigger.refresh(); },
            onLeave: () => { startFloat(); },
            onEnterBack: () => { stopFloat(); },
            onLeaveBack: () => { startFloat(); },
        },
        invalidateOnRefresh: true 
    }
    )
} else if (w > 1200){
    gsap.fromTo(rabbitImgObj.position, 
    {x: rabbitInitX, y: rabbitInitY, scale:rabbitImgObj.scale}, 
    {
        x: rabbitInitX + w / 6,
        y: rabbitInitY + h / 8,
        scale: 1.5,
        scrollTrigger: {
            trigger: ".scrollController",
            start: "top+=300vh",
            end: "top+=500vh",
            scrub: true,
            // markers: true,
            onEnter: () => { stopFloat(); ScrollTrigger.refresh(); },
            onLeave: () => { startFloat(); },
            onEnterBack: () => { stopFloat(); },
            onLeaveBack: () => { startFloat(); },
        },
    }
    )

}



// 在400~450vh的時候讓about Us 滾出來
gsap.fromTo([aboutUsh2, aboutUsh4, aboutUsp], 
    { opacity: 0, visibility: "hidden" },
    {
        opacity: 1,
        visibility: "visible",
        scrollTrigger: {
            trigger: ".scrollController",
            start: "top+=400vh",
            end: "top+=450vh",
            scrub: true,
            onUpdate: () => {
                aboutUsObj.position.z = camera.position.z + aboutUsObjZOffset;
            }
        }
    }
);

// 900~950的時候消失
gsap.fromTo([aboutUsh2, aboutUsh4, aboutUsp], 
    {opacity: 1},
    {
        opacity: 0,
        scrollTrigger: {
            trigger: ".scrollController",
            start: "top+=900vh",
            end: "top+=950vh",
            scrub: true,
            onUpdate: () => {
                aboutUsObj.position.z = camera.position.z + aboutUsObjZOffset;
            }
        }
    }
)

// page3
// 1000~1050vh service section
const serviceSection = document.querySelector(".serviceSection");
const serviceClone = serviceSection.cloneNode(true);
serviceClone.style.position = 'fixed';
serviceClone.style.width = "40vw";
serviceClone.style.height = "40vh";
serviceClone.style.color = "white";
serviceClone.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

const serviceh2 = serviceClone.querySelector("h2");
serviceh2.style.fontSize = "7vw";
serviceh2.style.margin = "0 0 3vh";
const serviceh4 = serviceClone.querySelector("h4");
serviceh4.style.margin = "1vh 0 0";
serviceh4.style.fontSize = "24px";
const servicep = serviceClone.querySelector("p");
servicep.style.margin = "3vh 0 0"
servicep.style.fontSize = "18px";

// serviceh2.style.opacity = "0";
// serviceh4.style.opacity = "0";
// servicep.style.opacity = "0";

const serviceObj = new CSS3DObject(serviceClone);
if (w <= 768){
    serviceh2.style.fontSize = "7vw";
    serviceh2.style.fontWeight = "900";
    serviceh4.style.fontSize = "4vw";
    servicep.style.fontSize = "10px";
    servicep.style.lineHeight = "12px";
    serviceObj.position.set(
        -w / 40,
        -h / 15,
        1,
    )
} else if (w < 1024 && w > 768){
    servicep.style.fontSize = "14px";
    servicep.style.lineHeight = "16px";
    serviceObj.position.set(
        -w / 50, 
        -h / 14,   
        1,
    )
} else if (w <= 1200 && w >=1024){
    serviceh4.style.fontSize = "24px";
    serviceh4.style.fontWeight = "900";
    servicep.style.fontSize = "18px";
    servicep.style.lineHeight = "24px";
    serviceObj.position.set(
        -w / 10,   
        -h / 12,   
        1,
    )
} else if (w > 1200){
    serviceh4.style.fontSize = "24px";
    serviceh4.style.fontWeight = "900";
    servicep.style.fontSize = "18px";
    servicep.style.lineHeight = "24px";
    // aboutUsObj.position.set(-200, -10, 0);
    serviceObj.position.set(
        -w / 7,   
        -h / 12,   
        1,
    )
}

scene.add(serviceObj);

const serviceZOffset = serviceObj.position.z - camera.position.z;

gsap.fromTo(serviceObj.element, 
    {opacity: 0, visibility: "hidden",},
    {
        opacity: 1,
        visibility: "visible",
        scrollTrigger:{
            trigger: ".scrollController",
            start: "top+=1000vh",
            end: "top+=1050vh",
            scrub: true,
            onUpdate: ()=>{
                serviceObj.position.z = camera.position.z +serviceZOffset
            }
        }
    }
)

gsap.fromTo(serviceObj.element, 
    {opacity: 1},
    {
        opacity: 0,
        scrollTrigger: {
            trigger: ".scrollController",
            start: "top+=1500vh",
            end: "top+=1550vh",
            scrub: true,
            onUpdate: () => {
                serviceObj.position.z = camera.position.z + serviceZOffset;
            }
        }
    }
)

const servicePlanetImg = document.querySelector(".servicePlanet");
const servicePlanetClone = servicePlanetImg.cloneNode(true);
servicePlanetClone.style.width = "80vw";
const servicePlanetObj = new CSS3DObject(servicePlanetClone);
scene.add(servicePlanetObj)
const servicePlanetZOffset = servicePlanetObj.position.z - camera.position.z;

if (w <= 768){
    servicePlanetObj.position.set(
        w / 6,
        -h / 3.5, 
        0,
    )
} else if (w < 1024 && w > 768){
    servicePlanetObj.position.set(
        w / 5,
        -h / 3.5, 
        0,
    )
} else if (w <= 1200 && w >=1024){
    servicePlanetObj.position.set(
        w / 2.5,
        -h / 3, 
        0,
    )
} else if (w > 1200){
    servicePlanetObj.position.set(
        w / 2,
        -h / 3, 
        0,
    )
}


function serviceFloat(){
    gsap.to(servicePlanetObj.position, {
        x: "+=10",
        y: "+=25",
        duration: 5,
        yoyo: true,
        repeat: -1,
    })
}
serviceFloat();

gsap.fromTo(servicePlanetObj.element, 
    { opacity: 0, visibility: "hidden" },
    {
        opacity: 1,
        visibility: "visible",
        scrollTrigger: {
            trigger: ".scrollController",
            start: "top+=1000vh",
            end: "top+=1050vh",
            scrub: true,
            onUpdate: () => {
                servicePlanetObj.position.z = camera.position.z + serviceZOffset;
            }
        }
    }
);

gsap.fromTo(servicePlanetObj.element, 
    {opacity: 1},
    {
        opacity: 0,
        scrollTrigger: {
            trigger: ".scrollController",
            start: "top+=1500vh",
            end: "top+=1550vh",
            scrub: true,
            onUpdate: () => {
                servicePlanetObj.position.z = camera.position.z + servicePlanetZOffset;
            }
        }
    }
)

// Page 4
const cardsWrapper = new THREE.Group();
scene.add(cardsWrapper);


const cards = [];

// 初始化卡片，加入 Z 距離計算
function create3DCard(className, targetX) {
    const dom = document.querySelector(`.${className}`);
    if (!dom) return null;
    const cardHeight = w > 1000 ? h/2 : h/3;
    const cardWidth = w < 760 ? 200 : 300;

    const clone = dom.cloneNode(true);
    clone.style.opacity = "0";
    clone.style.width = `${cardWidth}px`;
    clone.style.height = `${cardHeight}px`;
    clone.style.background = "rgba(255,255,255,0.1)";
    clone.style.borderRadius = "16px";
    clone.style.backdropFilter = "blur(10px)";
    clone.style.border = "1px solid white";
    clone.style.color = "white";
    clone.style.padding = "20px";

    const obj = new CSS3DObject(clone);
    obj.position.set(targetX - cardWidth/2, -h / 30, 0); // 平面排列
    obj.userData.targetX = targetX;

    cardsWrapper.add(obj);
    cards.push(obj);
    return obj;
}

let tgX = -400
if (w > 1200){
    tgX = -400
} else{
    tgX = 400
}


const card1 = create3DCard('price-card1', tgX);
const card2 = create3DCard('price-card2', tgX+400);
const card3 = create3DCard('price-card3', tgX+800);

cards.forEach((card, index) => {
    gsap.to(card.element, {
            opacity: 1,
            scrollTrigger: {
                trigger: ".scrollController",
                start: "top+=1600vh",
                end: "top+=1650vh",
                scrub: true,
            },
            delay: index * 0.1
        });

    gsap.ticker.add(()=>{
        card.position.z = camera.position.z + servicePlanetZOffset
    })
})

if (w > 1200){
    [card1, card2, card3].forEach((card, index) => {
        gsap.to(card.position, {
            x: card.userData.targetX,
            scrollTrigger: {
                trigger: ".scrollController",
                start: "top+=1600vh",
                end: "top+=1650vh",
                scrub: true,
            },
            onUpdate: () =>{
                card.position.z = camera.position.z + serviceZOffset;
            }
        });

    
    });
} else if (w >= 784) {
    gsap.to(cardsWrapper.position, {
    x: -1150, // 向左滑 800 單位，可依卡片寬調整
    scrollTrigger: {
        trigger: ".scrollController",
        start: "top+=1650vh",
        end: "bottom",
        scrub: true,
        // markers: true,
    }
});
} else {
    gsap.to(cardsWrapper.position, {
        x: -1150, // 向左滑 800 單位，可依卡片寬調整
        scrollTrigger: {
            trigger: ".scrollController",
            start: "top+=1650vh",
            end: "bottom",
            scrub: true,
            // markers: true,
        }
    });
}
gsap.fromTo(rabbitImgObj.element.style, 
    {visibility: "visible"},
    {
        visibility: "hidden",
        scrollTrigger:{
            trigger: ".scrollController",
            start: "top+=1600vh",
            end: "top+=1650vh",
            scrub: true
        }
    }
)




// 動畫主程式區
function animate(){
    requestAnimationFrame(animate);

    // 透明度控制
    const z = camera.position.z;
    const fadeStart = 400;
    const fadeEnd = 500;
    let opacity = 1;
    if (z <= fadeStart && z >= fadeEnd) {
        opacity = (z - fadeEnd) / (fadeStart - fadeEnd);
    } else if (z < fadeEnd) {
        opacity = 0;
    }
    sloganImgObj.element.style.opacity = opacity;


    renderer.render(scene, camera);
}

animate()

window.addEventListener("beforeunload", () => {
    window.scrollTo(0, 0);
});

