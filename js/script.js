class REVIEWS {
    constructor(options) {
        for (const key in options) {
            this[key] = document.querySelector(options[key]);
        }
        this.active = false;
        this.coordinatStart = 0;
        this.parent = this.el.parentElement;
        this.el.addEventListener('mousedown', (e) => this.eventStart(e))
        window.addEventListener('mousemove', (e) => this.eventMove(e))
        window.addEventListener('mouseup', (e) => this.eventEnd(e))

    }
    eventStart(e) {
        this.active = true
        this.coordinatStart = e.clientX;
    }
    eventMove(e) {
        if (this.active) {
            let left = e.clientX - this.coordinatStart,
                Left = 0,
                widthMove = this.parent.clientWidth - 10 - this.el.clientWidth

            if (left <= widthMove && left >= 0) {
                Left = left
                let protsent = 99 - parseInt((left * 100) / (widthMove / 2))
                let protsent2 = protsent
                if (protsent < 10 && protsent >= 0) {
                    protsent2 = `0${protsent}`
                } else if (protsent < 0) {
                    protsent2 = 0;
                }
                this.extraEl.style.opacity = '.' + protsent2;
            } else if (left < 0) {
                Left = 0
            } else {
                Left = widthMove
            }
            this.el.style.left = Left + 'px';
        }
    }
    eventEnd(e) {
        this.active = false
        let left = Number(this.el.style.left.split('').filter((a) => !isNaN(a)).join(''));
        this.el.style.transition = '0.2s';
        if (left >= this.parent.clientWidth - 10 - this.el.clientWidth - 20) {
            this.el.style.left = this.parent.clientWidth - 10 - this.el.clientWidth + 'px';
            this.extraEl.style.opacity = 0
            location.href = this.el.getAttribute('data-href');
        } else {
            this.el.style.left = 0;
            this.extraEl.style.opacity = 1
            this.extraEl.style.transition = '0.2s';
        }
        setTimeout(() => {
            this.el.style.transition = '0s'
            this.extraEl.style.transition = '0s'
        }, 200)

    }
}
const reviews = new REVIEWS({
    el: '.menu__reviews_span',
    extraEl: '.menu__reviews_text'
})

class qElement {
    next(el) {
        return el.nextElementSibling
    }
    prev(el) {
        return el.previousElementSibling
    }
    parent(el) {
        return el.parentElement
    }
    child(el) {
        return [...el.children]
    }
}
const element = new qElement()

class INPUT {
    constructor(options) {
        this.el = [...document.querySelectorAll(options.el)]
        this.confirmPass = this.el.filter(a => a.getAttribute('name') == 'confirmpass' || a.getAttribute('name') == 'pass')
        this.prevEl = []
        for (let i = 0; i < this.el.length; i++) {
            this.prevEl.push(element.prev(this.el[i]))
            this.el[i].addEventListener('focus', () => this.inputFocus(i))
            this.el[i].addEventListener('blur', () => this.inputBlur(i))
            this.el[i].addEventListener('input', () => this.type(i))
            if(element.next(this.el[i]) != null) {
                element.next(this.el[i]).addEventListener('mousedown', (e) => this.eye(e, element.next(this.el[i])))
                element.next(this.el[i]).addEventListener('mouseup', (e) => this.eye(e, element.next(this.el[i])))
            }
        }
        if(this.confirmPass.length == 2) {
            this.confirmPass.forEach((key, index, arr) => {
                key.addEventListener('input', () => this.confirm(key, arr));
            })
        }      
    }
    inputFocus(i) {
        this.el[i].style.borderColor = '#ffcb02';
        this.prevEl[i].style.top = '-7px'
        this.prevEl[i].style.fontSize = '16px'
        this.prevEl[i].style.color = '#ffcb02';
    }
    inputBlur(i) {
        if (this.el[i].value.length == 0) {
            this.el[i].style.borderColor = '#8a8888';
            this.prevEl[i].style.color = '#8a8888';
            this.prevEl[i].style.top = '13px'
            this.prevEl[i].style.fontSize = '29px'
        }
    }
    type(i) {
        if (this.el[i].getAttribute('data-type') == 'number') {
            let arr = `${this.el[i].value}`.match(/[0-9]/g)
            this.el[i].value = arr != null ? arr.join('') : '';
        }
    }
    eye(e, elem) {
        let parent = element.parent(elem);
           
        if(e.type == 'mousedown') {
            elem.querySelector('i').classList.remove('fa-eye-slash')
            elem.querySelector('i').classList.add('fa-eye')
            parent.querySelector('input').setAttribute('type', 'text')
        }else if(e.type == 'mouseup') {
            elem.querySelector('i').classList.add('fa-eye-slash')
            elem.querySelector('i').classList.remove('fa-eye')
            parent.querySelector('input').setAttribute('type', 'password')
        }
    }
    confirm(el, arr) {
        arr.forEach(key => {
            if(key != el) {
                if(key.value === el.value && key.value.length > 5 && el.value.length > 5) {
                    key.closest('form').querySelector('.form__btn').disabled = false
                    key.closest('form').querySelector('.form__error').style.display = 'none'
                }else {
                    if(key.value.length != 0 && el.value.length != 0) {
                        key.closest('form').querySelector('.form__error').style.display = 'block'
                    }
                    key.closest('form').querySelector('.form__btn').disabled = true

                }
            }
        })
    }
}
const input = new INPUT({
    el: '.form__input'
})

class SELECT {
    constructor(options) {
        this.el = [...document.querySelectorAll(options.el)]
        this.el.forEach((key, index) => {
            let el = key.querySelector('.form__select-name')
            element.next(el).style.top = key.clientHeight + 10 + 'px';
            this[index] = false
            el.addEventListener('click', () => this.open(el, index))
            el.addEventListener('click', () => this.close(el, index))
            let nextEl = element.next(el);
            this.createOption(nextEl, element.next(key))
            let nextChild = element.child(nextEl);
            setTimeout(() => {
                nextChild.forEach((v, i) => {
                    v.addEventListener('click', () => this.selectedOptions(el, i, v, index))
                })
            }, 100)

        })
    }
    open(elements, i) {
        if (this[i] == false) {
            let el = element.next(elements)
            el.style.width = 'max-content';
            el.style.height = 'max-content';
            el.style.opacity = 1;
            el.style.top = elements.clientHeight + 'px';
            setTimeout(() => {
                this[i] = true
            }, 200)
        }

    }
    close(elements, i) {
        if (this[i]) {
            let el = element.next(elements)
            setTimeout(() => {
                el.style.width = '0';
                el.style.height = '0';
                this[i] = false
            }, 200)
            el.style.opacity = 0;
            el.style.top = elements.clientHeight + 10 + 'px';
        }
    }
    selectedOptions(el, index, v, i) {
        let elem = element.next(element.parent(el)),
            elemChild = element.child(elem);
        elemChild.forEach((key) => {
            key.selected = false
        })
        elemChild[index].selected = true
        el.innerHTML = v.innerHTML
        this.close(el, i)

    }
    createOption(div, selec) {
        let child = element.child(selec)
        div.innerHTML = ''
        child.forEach(key => {
            let cE = document.createElement('div')
            cE.className = 'form__option'
            cE.innerHTML = key.innerHTML

            div.append(cE)
        })
    }
}
const select = new SELECT({
    el: '.form__select'
})


class SLIDER {
    constructor(options) {
        this.slider = document.querySelector(options.slider);
        if (this.slider) {


            this.sliderLine = this.slider.querySelector('.slider__line')
            this.slides = [...this.sliderLine.children]
            this.next = this.slider.querySelector('.slider__next')
            this.prev = this.slider.querySelector('.slider__prev')

            this.dir = options.direction.toUpperCase() == 'X' ? 'X' : 'Y';
            this.timeMove = options.time != undefined ? options.time : 1000
            this.width = this.slider.clientWidth
            this.height = this.slider.clientHeight
            this.moveSize = 'X' === this.dir ? this.width : this.height;
            this.interval = isNaN(options.interval) == true ? this.timeMove + 1000 : options.interval;
            this.activeSlide = 0;
            this.active = true
            if (options.dots) {
                let parent = document.createElement('ul')
                parent.className = 'slider__dots'
                this.slides.forEach(key => {
                    parent.innerHTML += '<li class="slider__dots-item"></li>';
                })
                this.slider.append(parent)
                this.dots = [...document.querySelector('.slider__dots').children]
                this.dots[this.activeSlide].classList.add('active')
            }
            this.interval
            this.dots.forEach((key, index) => {
                key.addEventListener('click', () => this.Dots(index))
            })
            this.sliderLine.style = `   position: relative;
                                    height: ${this.height}px;
                                    overflow: hidden;
                                `

            for (let i = 0; i < this.slides.length; i++) {
                const sl = this.slides[i];
                sl.style = `    position: absolute;
                            width: ${this.width}px;
                            height: ${this.height}px;
                        `;
                if (i != this.activeSlide) {
                    sl.style.transform = `translate${this.dir}(${this.moveSize}px)`;
                }
                if (i === this.slides.length - 1) {
                    sl.style.transform = `translate${this.dir}(${-this.moveSize}px)`;
                }
            }

            if (options.autoplay) {
                let interval = setInterval(() => {
                    this.move(this.next);
                }, this.interval);
                this.slider.addEventListener('mouseenter', () => {
                    clearInterval(interval);
                })
                this.slider.addEventListener('mouseleave', () => {
                    interval = setInterval(() => {
                        this.move(this.next)
                    }, this.interval);
                })
            }

            this.next.addEventListener('click', () => this.move(this.next))
            this.prev.addEventListener('click', () => this.move(this.prev))
        }
    }
    move(btn) {
        this.next.disabled = true
        this.prev.disabled = true
        setTimeout(() => {
            this.next.disabled = false;
            this.prev.disabled = false;
        }, this.timeMove + 500);
        let btnLeftOrRight = btn == this.next ? this.moveSize * -1 : this.moveSize;
        for (let i = 0; i < this.slides.length; i++) {
            const slide = this.slides[i];
            slide.style.transition = '0ms';
            if (i != this.activeSlide) {
                slide.style.transform = `translate${this.dir}(${btnLeftOrRight * -1}px)`;
            }
        }

        setTimeout(() => {
            this.slides[this.activeSlide].style.transform = `translate${this.dir}(${btnLeftOrRight}px)`;
            this.slides[this.activeSlide].style.transition = this.timeMove + 'ms';
            this.dots[this.activeSlide].classList.remove('active')
            if (btn == this.next) {
                this.activeSlide++
                if (this.activeSlide >= this.slides.length) {
                    this.activeSlide = 0
                }
            } else if (btn == this.prev) {
                this.activeSlide--
                if (this.activeSlide < 0) {
                    this.activeSlide = this.slides.length - 1
                }
            }
            this.slides[this.activeSlide].style.transform = `translate${this.dir}(0px)`;
            this.slides[this.activeSlide].style.transition = this.timeMove + 'ms';
            this.dots[this.activeSlide].classList.add('active')
        }, 100)
    }
    Dots(index) {
        if (this.active && index != this.activeSlide) {
            for (let i = 0; i < this.slides.length; i++) {
                const slide = this.slides[i];
                slide.style.transition = '0ms';
            }
            this.active = false
            this.dots.forEach(key => key.classList.remove('active'))

            let btnLeftOrRight = index > this.activeSlide ? this.moveSize : -this.moveSize;
            this.slides[index].style.transform = `translate${this.dir}(${btnLeftOrRight}px)`;
            setTimeout(() => {
                this.slides[this.activeSlide].style.transform = `translate${this.dir}(${-btnLeftOrRight}px)`;
                this.slides[this.activeSlide].style.transition = this.timeMove + 'ms';
                this.dots[this.activeSlide].classList.remove('active')

                this.activeSlide = index

                this.slides[this.activeSlide].style.transform = `translate${this.dir}(0px)`;
                this.slides[this.activeSlide].style.transition = this.timeMove + 'ms';
                this.dots[index].classList.add('active')
            }, 100)
            setTimeout(() => {
                this.active = true
            }, this.timeMove + 200)
        }
    }
}
const slider = new SLIDER({
    slider: '.slider',
    direction: 'X',
    time: 1000,
    autoplay: true,
    interval: 4000,
    dots: true
})




let h1 = document.querySelector('.header__title');

let h1Text = h1.innerHTML
h1.innerHTML = ''
let i = 0
function txt() {

    if (i < h1Text.length) {
        h1.innerHTML += h1Text[i]
        i++
        setTimeout(() => {
            txt()
        }, 100);
    }
}
txt()





const products = {
    hamburger: {
        name: 'Hamburger',
        price: 20000,
        kcall: 400,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        },
    },
    cheeseburger: {
        name: 'Cheeseburger',
        price: 24000,
        kcall: 500,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        },
    },
    cola: {
        name: 'Cola',
        price: 6500,
        kcall: 200,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        },
    },
    littlehamburger: {
        name: 'Little Hamburger',
        price: 18000,
        kcall: 400,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        },
    },
    littlecheeseburger: {
        name: 'Little Cheeseburger',
        price: 20000,
        kcall: 500,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        },
    },
    allbeefhotdog: {
        name: 'All beef hot-dog',
        price: 17000,
        kcall: 400,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        },
    },
    cheesedog: {
        name: 'Cheese-dog',
        price: 17000,
        kcall: 300,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        },
    },
    veggiesandwich: {
        name: 'Veggie Sandwich',
        price: 20000,
        kcall: 400,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        },
    },
    juice: {
        name: 'Juice Rich',
        price: 15000,
        kcall: 10,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        },
    },
    cheeseveggiesandwich: {
        name: 'Cheese Veggie Sandwich',
        price: 24000,
        kcall: 300,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        },
    },
    grilledcheese: {
        name: 'Grilled Cheese',
        price: 24000,
        kcall: 400,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        },
    },
    water: {
        name: 'Water',
        price: 2000,
        kcall: 100,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        },
    },
    grilledcheese: {
        name: 'Grilled Cheese',
        price: 24000,
        kcall: 400,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        },
    },
    regular: {
        name: 'Regular potato free',
        price: 17000,
        kcall: 400,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        },
    },
    fiveguysshake: {
        name: 'Milk Shake',
        price: 15000,
        kcall: 200,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        },
    },
    little: {
        name: 'Little potato free',
        price: 8000,
        kcall: 400,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        },
    },
    sprite: {
        name: 'Sprite',
        price: 7000,
        kcall: 100,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        },
    }
};
const btnPlusOrMinus = document.querySelectorAll('.main2__product-btn'),
    addCart = document.querySelector('.addCart'),
    receipt = document.querySelector('.receipt'),
    receiptWindow = document.querySelector('.receipt__window'),
    receiptOut = document.querySelector('.receipt__window-out'),
    receiptBtn = document.querySelector('.receipt__window-btn'),
    closeBtn = document.querySelector('.burger__close');

for (let i = 0; i < btnPlusOrMinus.length; i++) {
    const el = btnPlusOrMinus[i];
    el.addEventListener('click', function () {
        plusOrMinus(this)
    })
}
function plusOrMinus(element) {

    const parent = element.closest('.main2__product'),
        parentId = parent.getAttribute('id'),
        out = parent.querySelector('.main2__product-num'),
        price = parent.querySelector('.main2__product-price span'),
        kcall = parent.querySelector('.main2__product-kcall span'),
        elemData = element.getAttribute('data-symbol');
    if (elemData == '+' && products[parentId].amount < 10) {
        products[parentId].amount++;
    } else if (elemData == '-' && products[parentId].amount > 0) {
        products[parentId].amount--;
    }
    out.innerHTML = products[parentId].amount
    price.innerHTML = products[parentId].Summ
    kcall.innerHTML = products[parentId].Kcall
}


let arrayProduct = [],
    totalName = '',
    totalPrice = 0,
    totalKcall = 0;


addCart.addEventListener('click', function () {
    for (const key in products) {
        const po = products[key]
        if (po.amount > 0) {
            arrayProduct.push(po)
        }
        po.price = po.Summ;
        po.kcall = po.Kcall
    }

    for (let i = 0; i < arrayProduct.length; i++) {
        const el = arrayProduct[i];

        totalPrice += el.price
        totalKcall += el.kcall
        totalName += `${el.name} \n`

    }
    receiptOut.innerHTML = `Buyurtma:\n${totalName}\nKaloriya: ${totalKcall}\nUmumiy summa: ${totalPrice}`
    receipt.style.display = 'flex';
    setTimeout(() => {
        receipt.style.opacity = '1';
    }, 100);
    setTimeout(() => {
        receiptWindow.style.top = '30%';
    }, 200);
    let amountOut = document.querySelectorAll('.main__product-num')
    let kcallOut = document.querySelectorAll('.main__product-kcall span')
    let pricetOut = document.querySelectorAll('.main__product-price span')
    for (let i = 0; i < amountOut.length; i++) {
        amountOut[i].innerHTML = 0
        kcallOut[i].innerHTML = 0
        pricetOut[i].innerHTML = 0
    }
})
receiptBtn.addEventListener('click', function () {
    location.reload()
})
closeBtn.addEventListener('click', function () {
    receipt.style.display = 'none';
})
