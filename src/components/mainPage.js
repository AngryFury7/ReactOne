import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./mainPage.css";
import { Power4 ,Elastic} from "gsap";
import {Link} from 'react-router-dom'


import {ScrollTrigger,gsap} from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

export const consolethis = () => {
    const consoleLog = () => {
        console.log("button was clicked");
    };

    const button = document.querySelector(".buttonone");

    if (button) {
        button.addEventListener("click", consoleLog);
    }

    return () => {
        if (button) {
            button.removeEventListener("click", consoleLog);
        }
    };
};


//-------------------------------------------------------------------------------------------------------------------------------------------------------

export default function MainPage() {
    const [para, setP] = useState("");
    const [characters,changeC] = useState("0");
    const [words,changew] = useState("0");
    let buttonref = useRef(null);
    let spanref = useRef(null);
    gsap.registerPlugin(ScrollTrigger);


    useEffect(() => {
        const changeParagraph = (event) => {
            setP(event.target.value);
        };
    
        const inputField = document.querySelector(".inputField");
        if (inputField) {
            inputField.addEventListener("input", changeParagraph); // Change event to 'input'
        }
    
        return () => {
            if (inputField) {
                inputField.removeEventListener("input", changeParagraph);
            }
        };
    }, []);
    

    useEffect(() => {

        const countWords = (str) => {
            return str.trim() ? str.trim().split(/\s+/).length : 0;
        };
        
        
        const changeChar = (event) => {
            let A = event.target.value;
            changeC(A.length); // Now it correctly updates character count

            let C = countWords(A);
            changew(C);
        };

        const inputField = document.querySelector(".inputField");
        if (inputField) {
            inputField.addEventListener("keyup", changeChar);
        }

        return () => {
            if (inputField) {
                inputField.removeEventListener("keyup", changeChar);
            }
        };
    }, []);


    useLayoutEffect (()=> {
        let Me = () => {buttonref.current.addEventListener('mousemove',Mm);}
        let Mm = (event) => {
            gsap.to(buttonref.current,1.5,{
                x: ((( event.clientX - buttonref.current.getBoundingClientRect().left)/buttonref.current.offsetWidth) - 0.5) * 25,
                y: ((( event.clientY - buttonref.current.getBoundingClientRect().top)/buttonref.current.offsetHeight) - 0.5) * 25,
                rotate: "0.001deg",
                ease: Power4.easeOut
            });

            gsap.to(spanref.current,1.5,{
                x: ((( event.clientX - buttonref.current.getBoundingClientRect().left)/buttonref.current.offsetWidth) - 0.5) * 15,
                y: ((( event.clientY - buttonref.current.getBoundingClientRect().top)/buttonref.current.offsetHeight) - 0.5) * 15,
                rotate: "0.001deg",
                ease: Power4.easeOut
            })

        }
        buttonref.current.addEventListener('mouseenter',Me);

        return () => {
            buttonref.current.removeEventListener('mousemove',Mm);
            buttonref.current.removeEventListener('mouseenter',Me)
        }
    })


    useLayoutEffect (()=> {
        let ML = () => {
            gsap.to(buttonref.current,1.5,{
                x: 0,
                y: 0,
                rotate: "0.001deg",
                ease: Elastic.easeOut
            });

            gsap.to(spanref.current,1.5,{
                x: 0,
                y: 0,
                rotate: "0.001deg",
                ease: Elastic.easeOut
            })

        }
        buttonref.current.addEventListener('mouseleave',ML);

        return () => {
            buttonref.current.removeEventListener('mouseleave',ML)
        }
    })

    return (
        <>
            <div className="outer">
                <div style={{ height: "200px", width: "100vw" }}></div>
                <input type="text" placeholder="type here" className="inputField" />
                <br />
                <button className="buttonone" ref={buttonref}>
                    <Link to="/about" className="linkOne">
                    <span style={{display : "inline-block"}} ref={spanref}>Click Me</span>
                    </Link>
                </button>
                <div className="lower">
                    <p className="result">
                        Characters : {characters} ------ words : {words}
                    </p>
                </div>
            </div>
            <p className="yourTyping">{para}</p>
        </>
    );
}






// so first one was mouseEnter then it was mouseLeave so the basic structure used to look like this 
// mouseEnter --> mousemove --> position Coordinates
// mouseEnter = Me
//mousemove = Mm
//both i think i can just then remove the event listners assigned to them 
// then there is mouse Leave 

// so i need a parent Container to wrap things out of place

