const generateBtn=document.getElementById("Generate");
const sortBtn=document.getElementById("Sort");
const windowItem=document.querySelector(".window");
const methodBtn=document.getElementsByName('method');
const sliderEle=document.getElementById('slider');
const speedEle=document.getElementById('speed');
let barHeights=[];
let n=10;
let speed=400;

sliderEle.addEventListener("input",(event)=>{
    n=Math.floor(event.target.value);
    generate();
})

speedEle.addEventListener("input",(event)=>{
    speed=Math.floor(event.target.value);
    sort();
})


generateBtn.onclick=generate;
sortBtn.onclick=sort;

function generate() {
    barHeights=[]
    for(let i=0;i<n;i++){
        barHeights.push(randomIntFromInterval(1,80))
    }
    render()
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

function render(one=0,two=0){
    windowItem.innerHTML="";
    let elm = ''
    for(let i=0;i<n;i++){
        if(barHeights[i]===one || barHeights[i]===two){
            console.log("here")
            elm =`<div class='bar' style='background-color:yellow;height:${barHeights[i]}vh'></div>`
            windowItem.innerHTML += elm;
        }
        else{
            elm =`<div class='bar' style='height:${barHeights[i]}vh'></div>`
            windowItem.innerHTML += elm;  
        }
    }
}

function sort(){
    for(i = 0; i < methodBtn.length; i++) {
        if(methodBtn[i].checked){
            perform(methodBtn[i].value);
        }
}
}

function perform(method){
    switch (method) {
        case "bubble":
            bubbleSort(); 
            break;
        case "merge":
            mergeSort(barHeights,0,n-1)
            break;
        default:
            break;
    }
}

function delay(time){
    return new Promise(resolve => setTimeout(resolve,time));
}

//bubble sort
async function bubbleSort(){
    for(let i=0;i<n;i++){
        for(let j=0;j<n-i-1;j++){
            if(barHeights[j+1]<barHeights[j]){
                let tmp= barHeights[j+1];
                barHeights[j+1]=barHeights[j];
                barHeights[j]=tmp;
                await delay(speed)
                render(barHeights[j+1],barHeights[j]);
            }
        }
    }
    render(0,0);
}
//mergesort
async function doer(k){
    await delay(speed);
    render(arr[k+1],arr[k]);
    
}
function merge(arr, l, m, r)
{
    var n1 = m - l + 1;
    var n2 = r - m;
  
    // Create temp arrays
    var L = new Array(n1); 
    var R = new Array(n2);
  
    // Copy data to temp arrays L[] and R[]
    for (var i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (var j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];
      var i = 0;
    var j = 0;
  
    var k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
            doer(k);
        }
        else {
            arr[k] = R[j];
            j++;
            doer(k);
        }
        doer(k)
        k++;
    }

    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
    
}

function mergeSort(arr,l, r){
    if(l>=r){
        return;//returns recursively
    }
    var m =l+ parseInt((r-l)/2);
    mergeSort(arr,l,m);
    mergeSort(arr,m+1,r);
    merge(arr,l,m,r);
    render(0,0)
}
