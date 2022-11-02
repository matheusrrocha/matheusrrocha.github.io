'use strict'

const field = document.getElementById("lastNumber")
const onlyNextGames = document.getElementById("onlyNextGames")
const allNumbers = document.getElementById("allNumbers")
let numbersObject = []

const blacksRedsContainer = document.getElementById("black-reds")
const evenOddsContainer = document.getElementById("even-odd")
const orphansContainer = document.getElementById("orphans")
const lowHighContainer = document.getElementById("low-high")
const columnsContainer = document.getElementById("columns")
const dozensContainer = document.getElementById("dozens")
const inOutContainer = document.getElementById("in-out")
const slicesContainer = document.getElementById("slices")

const blackRedsMessageContainer = blacksRedsContainer.getElementsByClassName("list-colors")[0].getElementsByClassName("result")[0].getElementsByClassName("title")[0]
const evenOddMessageContainer = evenOddsContainer.getElementsByClassName("list-colors")[0].getElementsByClassName("result")[0].getElementsByClassName("title")[0]
const orphansMessageContainer = orphansContainer.getElementsByClassName("list-colors")[0].getElementsByClassName("result")[0].getElementsByClassName("title")[0]
const lowHighMessageContainer = lowHighContainer.getElementsByClassName("list-colors")[0].getElementsByClassName("result")[0].getElementsByClassName("title")[0]
const insOutsMessageContainer = inOutContainer.getElementsByClassName("list-colors")[0].getElementsByClassName("result")[0].getElementsByClassName("title")[0]
const dozensMessageContainer = dozensContainer.getElementsByClassName("list-colors")[0].getElementsByClassName("result")[0].getElementsByClassName("title")[0]
const slicesMessageContainer = slicesContainer.getElementsByClassName("list-colors")[0].getElementsByClassName("result")[0].getElementsByClassName("title")[0]
const columnsMessageContainer = columnsContainer.getElementsByClassName("list-colors")[0].getElementsByClassName("result")[0].getElementsByClassName("title")[0]

const blacks = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]
const reds = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]
const orphans = [1, 2, 3, 4, 5, 6, 7, 14, 15, 22, 23, 24, 25, 32, 33, 34, 35, 36]
const nonOrphans = [8, 11, 10, 13, 9, 12, 16, 19, 17, 20, 18, 21, 26, 29, 28, 31, 27, 30]
const column1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
const column2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
const column3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
const dozen1 = [1, 4, 7, 10, 2, 5, 8, 11, 3, 6, 9, 12]
const dozen2 = [13, 16, 19, 22, 14, 17, 20, 23, 15, 18, 21, 24]
const dozen3 = [25, 28, 31, 34, 26, 29, 32, 35, 27, 30, 33, 36]
const ins = [1, 2, 3, 10, 11, 12, 13, 14, 15, 22, 23, 24, 25, 26, 27, 34, 35, 36]
const outs = [4, 5, 6, 7, 8, 9, 16, 17, 18, 19, 20, 21, 28, 29, 30, 31, 32, 33]
const slice1 = [2, 4, 6, 13, 15, 17, 19, 21, 25, 27, 32, 34]
const slice2 = [1, 5, 8, 10, 11, 16, 20, 23, 24, 30, 33, 36]
const slice3 = [3, 7, 9, 12, 14, 18, 22, 26, 28, 29, 31, 35]


let blackRedsContinuosTrigger = document.getElementById("blackRedsContinuous").value
let blackRedsAlternateTrigger = document.getElementById("blackRedsAlternate").value
let evenOddContinuosTrigger = document.getElementById("evenOddContinuous").value
let evenOddAlternateTrigger = document.getElementById("evenOddAlternate").value
let orphansContinuosTrigger = document.getElementById("orphansContinuous").value
let orphansAlternateTrigger = document.getElementById("orphansAlternate").value
let lowHighContinuosTrigger = document.getElementById("lowHighContinuous").value
let lowHighAlternateTrigger = document.getElementById("lowHighAlternate").value
let inOutContinuosTrigger = document.getElementById("inOutContinuous").value
let inOutAlternateTrigger = document.getElementById("inOutAlternate").value
let columnContinuosTrigger = document.getElementById("columnContinuous").value
let columnAlternateTrigger = document.getElementById("columnAlternate").value
let dozenContinuosTrigger = document.getElementById("dozenContinuous").value
let dozenAlternateTrigger = document.getElementById("dozenAlternate").value
let sliceContinuosTrigger = document.getElementById("sliceContinuous").value
let sliceAlternateTrigger = document.getElementById("sliceAlternate").value

setInterval(() => {
    updateVars()
}, 1000)

onlyNextGames.addEventListener("click", (el) => {
    updateUI()
})

const updateUI = () => {
    allNumbers.innerHTML = ""
    const numbers = window.localStorage.getItem("numbers") ? JSON.parse(window.localStorage.getItem("numbers")) : []
    let index = 0

    if(numbers.length == 0) {
        allNumbers.innerHTML = "<p>Nenhum número adicionado até o momento</p>"
    }

    numbers.reverse().slice(-84).forEach(function (n) {
        let li = document.createElement("li")
        li.setAttribute("title", "Clique para remover")
        li.setAttribute("data-index", index)
        li.addEventListener("click", function (el) {
            numbers.splice(el.target.getAttribute("data-index"), 1)
            window.localStorage.setItem("numbers", JSON.stringify(numbers.reverse()))
            updateUI()
        })
        li.innerHTML = n
        allNumbers.appendChild(li)
        index++
    })

    const lastNumbers = numbers.reverse().slice(-15)
    field.focus()
    processNumbers(lastNumbers)
    updateBlackRedsUI(lastNumbers)
    updateEvenOddUI(lastNumbers)
    updateOrphansUI(lastNumbers)
    updateLowHighUI(lastNumbers)
    updateColumnsUI(lastNumbers)
    updateDozensUI(lastNumbers)
    updateInOutUI(lastNumbers)
    updateSlicesUI(lastNumbers)
}

const processNumbers = numbers => {
    numbersObject = []
    numbers.forEach(n => {
        const evenOdd = n % 2 == 0 ? "even" : "odd"
        const blackRed = blacks.includes(n) ? "black" : (reds.includes(n) ? "red" : "")
        const orphan = orphans.includes(n) ? "orphan" : (nonOrphans.includes(n) ? "nonorphans" : "")
        const inOut = ins.includes(n) ? "in" : (outs.includes(n) ? "out" : "")
        const lowHigh = (n <= 18 && n != 0) ? "low" : "high"
        let column = ""
        if(column1.includes(n)) {
            column = "column1"
        }

        if(column2.includes(n)) {
            column = "column2"
        }

        if(column3.includes(n)) {
            column = "column3"
        }

        let dozen = ""
        if(dozen1.includes(n)) {
            dozen = "dozen1"
        }

        if(dozen2.includes(n)) {
            dozen = "dozen2"
        }

        if(dozen3.includes(n)) {
            dozen = "dozen3"
        }

        let slice = ""
        if(slice1.includes(n)) {
            slice = "slice1"
        }

        if(slice2.includes(n)) {
            slice = "slice2"
        }

        if(slice3.includes(n)) {
            slice = "slice3"
        }


        numbersObject.push({
            n,
            evenOdd,
            blackRed,
            orphan,
            lowHigh,
            column,
            dozen,
            inOut,
            slice
        })
    })
}

const clearColunms = columns => {
    for (let i = 0; i < columns.length; i++) {
        const element = columns[i]
        if(!element.classList.contains("result")) {
            element.className = "column"
            element.innerHTML = ""
        }
    }
}

const clearAll = () => {
    window.localStorage.setItem("numbers", JSON.stringify([]))
    updateUI()
}

const hideContainerWithoutGames = (container, sequence, continuosTrigger, alternates, alternatesTrigger) => {
    let shouldHideSequence = false
    let shouldHideAlternates = false

    if(onlyNextGames.checked) {
        if(sequence < continuosTrigger - 2) { 
            shouldHideSequence = true
        } else {
            shouldHideSequence = false
        }

        if(alternates < alternatesTrigger - 2) { 
            shouldHideAlternates = true
        } else {
            shouldHideAlternates = false
        }
    } else {
        shouldHideAlternates = shouldHideSequence = false
    }


    if(shouldHideSequence && shouldHideAlternates) {
        container.classList.add("hidden")
    } else {
        container.classList.remove("hidden")
    }
}

const saveNumber = function saveNumber(n) {
    const numbers = window.localStorage.getItem("numbers") ? JSON.parse(window.localStorage.getItem("numbers")) : []
    numbers.push(parseInt(n))
    window.localStorage.setItem("numbers", JSON.stringify(numbers))
}

const clearField = function clearField() {
    field.value = ""
}

function saveLastNumber(event) {
    var number = field.value
    if (number) {
        if(parseInt(number) >= 0 && parseInt(number) <= 36) {
            saveNumber(number)
            clearField()
        } else {
            clearField()
            alert("O número digitado deve ser um inteiro entre 0 e 36.")
        }

        updateUI()
    } else (
        alert("Preencha um valor.")
    )

    return false
}

const updateBlackRedsUI = numbers => {
    const columns = blacksRedsContainer.getElementsByClassName("list-colors")[0].getElementsByClassName("column")
    clearColunms(columns)
    let index = 0

    let sequence = 0
    let alternates = 0
    let lastColor = ""
    numbers.forEach(n => {
        if(n == 0) {
            columns[index].classList.add("green-zero")
            sequence = 0
            alternates = 0
            lastColor = ""
        }

        if(blacks.includes(n)) {
            columns[index].classList.add("black")   

            if(lastColor == "") {
                sequence = 1
                alternates = 1
            } else if (lastColor == "black")  {
                sequence++
                alternates = 0
            } else if (lastColor == "red") {
                sequence = 1
                alternates++
            } 

            lastColor = "black"
        }

        if(reds.includes(n)) {
            columns[index].classList.add("red")    

            if(lastColor == "") {
                sequence = 1
                alternates = 1
            } else if(lastColor == "red")  {
                sequence++
                alternates = 0
            } else if (lastColor == "black") {
                sequence = 1
                alternates++
            }

            lastColor = "red"
        }

        columns[index].innerHTML = n
        index++
    })

    const continuosTrigger = parseInt(blackRedsContinuosTrigger)
    const alternatesTrigger = parseInt(blackRedsAlternateTrigger)
    
    if(sequence >= continuosTrigger - 1) {
        if(lastColor == "black") {
            blackRedsMessageContainer.innerHTML = `Aposta nas <span class="red">vermelhas</span>`
        } else {
            blackRedsMessageContainer.innerHTML = `Aposta nas <span class="black">pretas</span>`
        }
    } else {
        if(sequence == continuosTrigger - 2) { 
            blackRedsMessageContainer.innerHTML = "Prepare-se!"
        } else {
            if(alternates >= alternatesTrigger - 1) {
                if(lastColor == "black") {
                    blackRedsMessageContainer.innerHTML = `Aposta nas <span class="black">pretas</span>`
                } else {
                    blackRedsMessageContainer.innerHTML = `Aposta nas <span class="red">vermelhas</span>`
                }
            } else {
                if(alternates == alternatesTrigger - 2) { 
                    blackRedsMessageContainer.innerHTML = "Prepare-se!"
                } else {
                    blackRedsMessageContainer.innerHTML = ""
                }
            }
        }
    }

    hideContainerWithoutGames(blacksRedsContainer, sequence, continuosTrigger, alternates, alternatesTrigger)
}

const updateEvenOddUI = numbers => {
    const columns = evenOddsContainer.getElementsByClassName("list-colors")[0].getElementsByClassName("column")
    clearColunms(columns)
    let index = 0
    let sequence = 0
    let alternates = 0
    let lastColor = ""

    numbers.forEach(n => {
        if(n % 2 != 0) {
            columns[index].classList.add("green")  
            if(lastColor == "") {
                sequence = 1
                alternates = 1
            } else if (lastColor == "green")  {
                sequence++
                alternates = 0
            } else if (lastColor == "red") {
                sequence = 1
                alternates++
            }  

            lastColor = "green"
        }

        if(n % 2 == 0) {
            columns[index].classList.add("red")   

            if(lastColor == "") {
                sequence = 1
                alternates = 1
            } else if(lastColor == "red")  {
                sequence++
                alternates = 0
            } else if (lastColor == "green") {
                sequence = 1
                alternates++
            }

            lastColor = "red"
        }

        if(n == 0) {
            columns[index].classList.add("green-zero")    
            sequence = 0
            alternates = 0
            lastColor = ""
        }


        columns[index].innerHTML = n
        index++
    })

    const continuosTrigger = parseInt(evenOddContinuosTrigger)
    const alternatesTrigger = parseInt(evenOddAlternateTrigger)
    
    if(sequence >= continuosTrigger - 1) {
        if(lastColor == "green") {
            evenOddMessageContainer.innerHTML = `Aposta nas <span class="red">vermelhas</span>`
        } else {
            evenOddMessageContainer.innerHTML = `Aposta nas <span class="green">verdes</span>`
        }
    } else {
        if(sequence == continuosTrigger - 2) { 
            evenOddMessageContainer.innerHTML = "Prepare-se!"
        } else {
            if(alternates >= alternatesTrigger - 1) {
                if(lastColor == "green") {
                    evenOddMessageContainer.innerHTML = `Aposta nas <span class="green">verdes</span>`
                } else {
                    evenOddMessageContainer.innerHTML = `Aposta nas <span class="red">vermelhas</span>`
                }
            } else {
                if(alternates == alternatesTrigger - 2) { 
                    evenOddMessageContainer.innerHTML = "Prepare-se!"
                } else {
                    evenOddMessageContainer.innerHTML = ""
                }
            }
        }
    }


    hideContainerWithoutGames(evenOddsContainer, sequence, continuosTrigger, alternates, alternatesTrigger)
}

const updateOrphansUI = numbers => {
    const columns = orphansContainer.getElementsByClassName("list-colors")[0].getElementsByClassName("column")
    clearColunms(columns)
    let index = 0
    let sequence = 0
    let alternates = 0
    let lastColor = ""

    numbers.forEach(n => {
        if(orphans.includes(n)) {
            columns[index].classList.add("green")  
            if(lastColor == "") {
                sequence = 1
                alternates = 1
            } else if (lastColor == "green")  {
                sequence++
                alternates = 0
            } else if (lastColor == "red") {
                sequence = 1
                alternates++
            }  

            lastColor = "green"
        }

        if(nonOrphans.includes(n)) {
            columns[index].classList.add("red")   

            if(lastColor == "") {
                sequence = 1
                alternates = 1
            } else if(lastColor == "red")  {
                sequence++
                alternates = 0
            } else if (lastColor == "green") {
                sequence = 1
                alternates++
            }

            lastColor = "red"
        }

        if(n == 0) {
            columns[index].classList.add("green-zero")    
            sequence = 0
            alternates = 0
            lastColor = ""
        }


        columns[index].innerHTML = n
        index++
    })

    const continuosTrigger = parseInt(orphansContinuosTrigger)
    const alternatesTrigger = parseInt(orphansAlternateTrigger)
    
    if(sequence >= continuosTrigger - 1) {
        if(lastColor == "green") {
            orphansMessageContainer.innerHTML = `Aposta nas <span class="red">vermelhas</span>`
        } else {
            orphansMessageContainer.innerHTML = `Aposta nas <span class="green">verdes</span>`
        }
    } else {
        if(sequence == continuosTrigger - 2) { 
            orphansMessageContainer.innerHTML = "Prepare-se!"
        } else {
            if(alternates >= alternatesTrigger - 1) {
                if(lastColor == "green") {
                    orphansMessageContainer.innerHTML = `Aposta nas <span class="green">verdes</span>`
                } else {
                    orphansMessageContainer.innerHTML = `Aposta nas <span class="red">vermelhas</span>`
                }
            } else {
                if(alternates == alternatesTrigger - 2) { 
                    orphansMessageContainer.innerHTML = "Prepare-se!"
                } else {
                    orphansMessageContainer.innerHTML = ""
                }
            }
        }
    }

    hideContainerWithoutGames(orphansContainer, sequence, continuosTrigger, alternates, alternatesTrigger)
}

const updateLowHighUI = numbers => {
    const columns = lowHighContainer.getElementsByClassName("list-colors")[0].getElementsByClassName("column")
    clearColunms(columns)
    let index = 0
    let sequence = 0
    let alternates = 0
    let lastColor = ""

    numbers.forEach(n => {
        if(n >= 19) {
            columns[index].classList.add("green")  
            if(lastColor == "") {
                sequence = 1
                alternates = 1
            } else if (lastColor == "green")  {
                sequence++
                alternates = 0
            } else if (lastColor == "red") {
                sequence = 1
                alternates++
            }  

            lastColor = "green"
        }

        if(n <= 18) {
            columns[index].classList.add("red")   

            if(lastColor == "") {
                sequence = 1
                alternates = 1
            } else if(lastColor == "red")  {
                sequence++
                alternates = 0
            } else if (lastColor == "green") {
                sequence = 1
                alternates++
            }

            lastColor = "red"
        }

        if(n == 0) {
            columns[index].classList.add("green-zero")    
            sequence = 0
            alternates = 0
            lastColor = ""
        }


        columns[index].innerHTML = n
        index++
    })

    const continuosTrigger = parseInt(lowHighContinuosTrigger)
    const alternatesTrigger = parseInt(lowHighAlternateTrigger)
    
    if(sequence >= continuosTrigger - 1) {
        if(lastColor == "green") {
            lowHighMessageContainer.innerHTML = `Aposta nas <span class="red">vermelhas</span> - Números 1 - 18`
        } else {
            lowHighMessageContainer.innerHTML = `Aposta nas <span class="green">verdes</span>  - Números 19 - 36`
        }
    } else {
        if(sequence == continuosTrigger - 2) { 
            lowHighMessageContainer.innerHTML = "Prepare-se!"
        } else {
            if(alternates >= alternatesTrigger - 1) {
                if(lastColor == "green") {
                    lowHighMessageContainer.innerHTML = `Aposta nas <span class="green">verdes</span> - Números 19 - 36`
                } else {
                    lowHighMessageContainer.innerHTML = `Aposta nas <span class="red">vermelhas</span> - Números 1 - 18`
                }
            } else {
                if(alternates == alternatesTrigger - 2) { 
                    lowHighMessageContainer.innerHTML = "Prepare-se!"
                } else {
                    lowHighMessageContainer.innerHTML = ""
                }
            }
        }
    }

    hideContainerWithoutGames(lowHighContainer, sequence, continuosTrigger, alternates, alternatesTrigger)
}

const updateColumnsUI = numbers => {
    const columns = columnsContainer.getElementsByClassName("list-colors")[0].getElementsByClassName("column")
    clearColunms(columns)
    let index = 0
    let sequence = 0
    let alternates = 0
    let lastColor = ""
    numbers.forEach(n => {
        if(column1.includes(n)) {
            columns[index].classList.add("green")    
        }

        if(column2.includes(n)) {
            columns[index].classList.add("blue")    
        }

        if(column3.includes(n)) {
            columns[index].classList.add("yellow")    
        }

        if(n == 0) {
            columns[index].classList.add("green-zero")    
        }

        columns[index].innerHTML = n
        index++
    })

    const continuosTrigger = parseInt(columnContinuosTrigger)
    const alternatesTrigger = parseInt(columnAlternateTrigger)


    hideContainerWithoutGames(columnsContainer, sequence, continuosTrigger, alternates, alternatesTrigger)
}

const updateDozensUI = numbers => {
    const columns = dozensContainer.getElementsByClassName("list-colors")[0].getElementsByClassName("column")
    clearColunms(columns)
    let index = 0
    let sequence = 0
    let alternates = 0
    let lastColor = ""
    numbers.forEach(n => {
        if(dozen1.includes(n)) {
            columns[index].classList.add("green")    
        }

        if(dozen2.includes(n)) {
            columns[index].classList.add("blue")    
        }

        if(dozen3.includes(n)) {
            columns[index].classList.add("yellow")    
        }

        if(n == 0) {
            columns[index].classList.add("green-zero")    
        }

        columns[index].innerHTML = n
        index++
    })

    const continuosTrigger = parseInt(dozenContinuosTrigger)
    const alternatesTrigger = parseInt(dozenAlternateTrigger)

    hideContainerWithoutGames(dozensContainer, sequence, continuosTrigger, alternates, alternatesTrigger)
}

const updateInOutUI = numbers => {
    const columns = inOutContainer.getElementsByClassName("list-colors")[0].getElementsByClassName("column")
    clearColunms(columns)
    let index = 0
    let sequence = 0
    let alternates = 0
    let lastColor = ""
    numbers.forEach(n => {
        if(n == 0) {
            columns[index].classList.add("green-zero")
            sequence = 0
            alternates = 0
            lastColor = ""
        }

        if(ins.includes(n)) {
            columns[index].classList.add("green")   

            if(lastColor == "") {
                sequence = 1
                alternates = 1
            } else if (lastColor == "green")  {
                sequence++
                alternates = 0
            } else if (lastColor == "red") {
                sequence = 1
                alternates++
            } 

            lastColor = "green"
        }

        if(outs.includes(n)) {
            columns[index].classList.add("red")    

            if(lastColor == "") {
                sequence = 1
                alternates = 1
            } else if(lastColor == "red")  {
                sequence++
                alternates = 0
            } else if (lastColor == "green") {
                sequence = 1
                alternates++
            }

            lastColor = "red"
        }

        columns[index].innerHTML = n
        index++
    })

    const continuosTrigger = parseInt(inOutContinuosTrigger)
    const alternatesTrigger = parseInt(inOutAlternateTrigger)
    
    if(sequence >= continuosTrigger - 1) {
        if(lastColor == "green") {
            insOutsMessageContainer.innerHTML = `Aposta nas <span class="red">vermelhas</span> - Números de fora`
        } else {
            insOutsMessageContainer.innerHTML = `Aposta nas <span class="green">verdes</span> - Números de dentro`
        }
    } else {
        if(sequence == continuosTrigger - 2) { 
            insOutsMessageContainer.innerHTML = "Prepare-se!"
        } else {
            if(alternates >= alternatesTrigger - 1) {
                if(lastColor == "green") {
                    insOutsMessageContainer.innerHTML = `Aposta nas <span class="green">verdes</span> - Números de dentro`
                } else {
                    insOutsMessageContainer.innerHTML = `Aposta nas <span class="red">vermelhas</span> - Números de fora`
                }
            } else {
                if(alternates == alternatesTrigger - 2) { 
                    insOutsMessageContainer.innerHTML = "Prepare-se!"
                } else {
                    insOutsMessageContainer.innerHTML = ""
                }
            }
        }
    }

    hideContainerWithoutGames(inOutContainer, sequence, continuosTrigger, alternates, alternatesTrigger)
}

const updateSlicesUI = numbers => {
    const columns = slicesContainer.getElementsByClassName("list-colors")[0].getElementsByClassName("column")
    clearColunms(columns)
    let index = 0
    let sequence = 0
    let alternates = 0
    let lastColor = ""
    numbers.forEach(n => {
        if(slice1.includes(n)) {
            columns[index].classList.add("green")    
        }

        if(slice2.includes(n)) {
            columns[index].classList.add("blue")    
        }

        if(slice3.includes(n)) {
            columns[index].classList.add("yellow")    
        }

        if(n == 0) {
            columns[index].classList.add("green-zero")    
        }

        columns[index].innerHTML = n
        index++
    })

    const continuosTrigger = parseInt(sliceContinuosTrigger)
    const alternatesTrigger = parseInt(sliceAlternateTrigger)

    hideContainerWithoutGames(slicesContainer, sequence, continuosTrigger, alternates, alternatesTrigger)
}

const updateVars = () => {
    blackRedsContinuosTrigger = document.getElementById("blackRedsContinuous").value
    window.localStorage.setItem("blackRedsContinuous", blackRedsContinuosTrigger)
    blackRedsAlternateTrigger = document.getElementById("blackRedsAlternate").value
    window.localStorage.setItem("blackRedsAlternate", blackRedsAlternateTrigger)

    evenOddContinuosTrigger = document.getElementById("evenOddContinuous").value
    window.localStorage.setItem("evenOddContinuous", evenOddContinuosTrigger)
    evenOddAlternateTrigger = document.getElementById("evenOddAlternate").value
    window.localStorage.setItem("evenOddAlternate", evenOddAlternateTrigger)

    orphansContinuosTrigger = document.getElementById("orphansContinuous").value
    window.localStorage.setItem("orphansContinuous", orphansContinuosTrigger)
    orphansAlternateTrigger = document.getElementById("orphansAlternate").value
    window.localStorage.setItem("orphansAlternate", orphansAlternateTrigger)

    lowHighContinuosTrigger = document.getElementById("lowHighContinuous").value
    window.localStorage.setItem("lowHighContinuous", lowHighContinuosTrigger)
    lowHighAlternateTrigger = document.getElementById("lowHighAlternate").value
    window.localStorage.setItem("lowHighAlternate", lowHighAlternateTrigger)

    inOutContinuosTrigger = document.getElementById("inOutContinuous").value
    window.localStorage.setItem("inOutContinuous", inOutContinuosTrigger)
    inOutAlternateTrigger = document.getElementById("inOutAlternate").value
    window.localStorage.setItem("inOutAlternate", inOutAlternateTrigger)

    columnContinuosTrigger = document.getElementById("columnContinuous").value
    window.localStorage.setItem("columnContinuous", columnContinuosTrigger)
    columnAlternateTrigger = document.getElementById("columnAlternate").value
    window.localStorage.setItem("columnAlternate", columnAlternateTrigger)

    dozenContinuosTrigger = document.getElementById("dozenContinuous").value
    window.localStorage.setItem("dozenContinuous", dozenContinuosTrigger)
    dozenAlternateTrigger = document.getElementById("dozenAlternate").value
    window.localStorage.setItem("dozenAlternate", dozenAlternateTrigger)

    sliceContinuosTrigger = document.getElementById("sliceContinuous").value
    window.localStorage.setItem("sliceContinuous", sliceContinuosTrigger)
    sliceAlternateTrigger = document.getElementById("sliceAlternate").value
    window.localStorage.setItem("sliceAlternate", sliceAlternateTrigger)
}

const loadInitialVars = () => {
    if(window.localStorage.getItem("blackRedsContinuous")) {
        blackRedsContinuosTrigger = window.localStorage.getItem("blackRedsContinuous")
        document.getElementById("blackRedsContinuous").value = window.localStorage.getItem("blackRedsContinuous")
    }

    if(window.localStorage.getItem("blackRedsAlternate")) {
        blackRedsContinuosTrigger = window.localStorage.getItem("blackRedsAlternate")
        document.getElementById("blackRedsAlternate").value = window.localStorage.getItem("blackRedsAlternate")
    }

    if(window.localStorage.getItem("evenOddContinuous")) {
        evenOddContinuosTrigger = window.localStorage.getItem("evenOddContinuous")
        document.getElementById("evenOddContinuous").value = window.localStorage.getItem("evenOddContinuous")
    }

    if(window.localStorage.getItem("evenOddAlternate")) {
        evenOddContinuosTrigger = window.localStorage.getItem("evenOddAlternate")
        document.getElementById("evenOddAlternate").value = window.localStorage.getItem("evenOddAlternate")
    }

    if(window.localStorage.getItem("orphansContinuous")) {
        orphansContinuosTrigger = window.localStorage.getItem("orphansContinuous")
        document.getElementById("orphansContinuous").value = window.localStorage.getItem("orphansContinuous")
    }

    if(window.localStorage.getItem("orphansAlternate")) {
        orphansContinuosTrigger = window.localStorage.getItem("orphansAlternate")
        document.getElementById("orphansAlternate").value = window.localStorage.getItem("orphansAlternate")
    }

    if(window.localStorage.getItem("lowHighContinuous")) {
        lowHighContinuosTrigger = window.localStorage.getItem("lowHighContinuous")
        document.getElementById("lowHighContinuous").value = window.localStorage.getItem("lowHighContinuous")
    }

    if(window.localStorage.getItem("lowHighAlternate")) {
        lowHighContinuosTrigger = window.localStorage.getItem("lowHighAlternate")
        document.getElementById("lowHighAlternate").value = window.localStorage.getItem("lowHighAlternate")
    }

    if(window.localStorage.getItem("inOutContinuous")) {
        inOutContinuosTrigger = window.localStorage.getItem("inOutContinuous")
        document.getElementById("inOutContinuous").value = window.localStorage.getItem("inOutContinuous")
    }

    if(window.localStorage.getItem("inOutAlternate")) {
        inOutContinuosTrigger = window.localStorage.getItem("inOutAlternate")
        document.getElementById("inOutAlternate").value = window.localStorage.getItem("inOutAlternate")
    }

    if(window.localStorage.getItem("columnContinuous")) {
        columnContinuosTrigger = window.localStorage.getItem("columnContinuous")
        document.getElementById("columnContinuous").value = window.localStorage.getItem("columnContinuous")
    }

    if(window.localStorage.getItem("columnAlternate")) {
        columnContinuosTrigger = window.localStorage.getItem("columnAlternate")
        document.getElementById("columnAlternate").value = window.localStorage.getItem("columnAlternate")
    }

    if(window.localStorage.getItem("dozenContinuous")) {
        dozenContinuosTrigger = window.localStorage.getItem("dozenContinuous")
        document.getElementById("dozenContinuous").value = window.localStorage.getItem("dozenContinuous")
    }

    if(window.localStorage.getItem("dozenAlternate")) {
        dozenContinuosTrigger = window.localStorage.getItem("dozenAlternate")
        document.getElementById("dozenAlternate").value = window.localStorage.getItem("dozenAlternate")
    }

    if(window.localStorage.getItem("sliceContinuous")) {
        sliceContinuosTrigger = window.localStorage.getItem("sliceContinuous")
        document.getElementById("sliceContinuous").value = window.localStorage.getItem("sliceContinuous")
    }

    if(window.localStorage.getItem("sliceAlternate")) {
        sliceContinuosTrigger = window.localStorage.getItem("sliceAlternate")
        document.getElementById("sliceAlternate").value = window.localStorage.getItem("sliceAlternate")
    }
}

loadInitialVars()
updateUI()