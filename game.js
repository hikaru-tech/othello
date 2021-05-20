"use strict"

const STONE = "●";
const table = document.getElementById("table");

const NONE = 0;
const BLACK = 1;
const WHITE = 2;

let turn = true;　//trueが黒、falseが白

const textBlack = document.getElementById("text-black");
const textWhite = document.getElementById("text-white");

const msg = document.getElementById("error");

const textTurn = document.getElementById("turn")

var sumOfBlack = 2;
var sumOfWhite = 2;
var empty = 60;

let sumOfStone = "";


//盤面の状況を二次元配列で定義
//データベース
const table_ar = new Array(8);
for ( var i = 0; i < 8; i++) {
    table_ar[i] = new Array(8);
    for ( var j = 0; j < 8; j++) {
        table_ar[i][j] = 0;
    }
};

//初期化
function init() {
    //8x8のテーブルを生成
    for (var i = 0; i < 8; i++) {
        var tr = document.createElement("tr");
        for (var j = 0; j < 8; j++) {
            //table_arを一旦０にする
            table_ar[i][j] = 0;
            var td = document.createElement("td");
            td.id = "cell_" + i + j;
            // td.onclick = clicked;
            td.addEventListener("click", e => {
                clicked(e.target.id); 
            }); 
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    turn = true;
    table_ar[3][3] = BLACK;
    table_ar[3][4] = WHITE;
    table_ar[4][3] = WHITE;
    table_ar[4][4] = BLACK;

    draw(table_ar);
    displayTurn();
};

function clicked(cell) {
    // const clickedCell = document.getElementById(cell);
    //クリックしたセルのidのiとjを取得
    const clickedItem = document.getElementById(cell);
    const clickedClass = clickedItem.className
    const iOfId = cell.charAt(5); 
    const jOfId = cell.charAt(6); 
    const iNum = parseFloat(iOfId);
    const jNum = parseFloat(jOfId);

    //最後のチェンジターンのチェック用にクリックしたセルのtable_ar[][]をコピー
    const copyTableArr = table_ar[iNum][jNum]; 

    //クリックしたところに石がないことをチェック
    if ( clickedClass !== "black" && clickedClass !== "white" ) {
        //黒ターンの時の処理
        if ( turn ) {
            //上
            if ( iNum > 0 ) {
                //上 が白だったら
                if ( table_ar[iNum - 1][jNum] === WHITE ) {
                    //スイッチで上方向を調べる
                    outer:
                    for ( var x = 1; x <= iNum; x++ ) {
                        switch ( table_ar[iNum - x][jNum] ) {
                            case WHITE:
                                break;
                            case NONE:
                                break outer;
                            case BLACK:
                                //クリックした位置を黒に
                                table_ar[iNum][jNum] = BLACK;
                                //挟んだ位置を黒に
                                for ( var i = 1; i < x; i++) {
                                    table_ar[iNum - i][jNum] = BLACK;
                                }
                                break;
                            default:
                        }
                    }
                }
            }
            //右上
            if ( iNum > 0 && jNum < 7 ) { 
                if ( table_ar[iNum - 1][jNum + 1] === WHITE ) {
                    outer:
                    for ( var x = 1; x <= iNum; x++ ) {
                        switch ( table_ar[iNum - x][jNum + x] ) {
                            case WHITE:
                                break;
                            case NONE:
                                break outer;
                            case BLACK:
                                table_ar[iNum][jNum] = BLACK;
                                for ( var i = 1; i < x; i++) {                                   
                                    table_ar[iNum - i][jNum + i] = BLACK;                                    
                                }
                                break;
                            default:
                        }                    
                    }
                }
            }
            //右下
            if ( jNum < 7 ) {
                if ( table_ar[iNum][jNum + 1] === WHITE ) {
                    outer:
                    for ( var x = 1; x < (8 - jNum); x++ ) {
                        switch ( table_ar[iNum][jNum + x] ) {
                            case WHITE:
                                break;
                            case NONE:
                                break outer;
                            case BLACK:
                                table_ar[iNum][jNum] = BLACK;
                                for ( var i = 1; i < x; i++) {                                   
                                    table_ar[iNum][jNum + i] = BLACK;                                    
                                }
                                break;
                            default:
                        }                    
                    }
                }
            }
            //右下
            if ( iNum < 7 && jNum < 7 ) {
                if ( table_ar[iNum + 1][jNum + 1] === WHITE ) {
                    outer:
                    for ( var x = 1; x < (8 - iNum); x++ ) {
                        switch ( table_ar[iNum + x][jNum + x] ) {
                            case WHITE:
                                break;
                            case NONE:
                                break outer;
                            case BLACK:
                                table_ar[iNum][jNum] = BLACK;
                                for ( var i = 1; i < x; i++) {                                   
                                    table_ar[iNum + i][jNum + i] = BLACK;                                    
                                }
                                break;
                            default:
                        }                    
                    }
                }
            }
            //下
            if ( iNum < 7 ) {        
                if ( table_ar[iNum + 1][jNum] === WHITE ) {
                    outer:
                    for ( var x = 1; x < (8 - iNum); x++ ) {
                        switch ( table_ar[iNum + x][jNum] ) {
                            case WHITE:
                                break;
                            case NONE:
                                break outer;
                            case BLACK:
                                table_ar[iNum][jNum] = BLACK;
                                for ( var i = 1; i < x; i++) {                                   
                                    table_ar[iNum + i][jNum] = BLACK;                                    
                                }
                                break;
                            default:
                        }                    
                    }
                }
            }
            //左下
            if ( iNum < 7 && jNum > 0 ) {         
                if ( table_ar[iNum + 1][jNum - 1] === WHITE ) {
                    for ( var x = 1; x < (8 - iNum); x++ ) {
                        outer:
                        switch ( table_ar[iNum + x][jNum - x] ) {
                            case WHITE:
                                break;
                            case NONE:
                                break outer;
                            case BLACK:
                                table_ar[iNum][jNum] = BLACK;
                                for ( var i = 1; i < x; i++) {                                   
                                    table_ar[iNum + i][jNum - i] = BLACK;                                    
                                }
                                break;
                            default:
                        }                    
                    }
                }
            }
            //左
            if ( jNum > 0 ) {
                if ( table_ar[iNum][jNum - 1] === WHITE ) {
                    outer:
                    for ( var x = 1; x <= jNum; x++ ) {
                        switch ( table_ar[iNum][jNum - x] ) {
                            case WHITE:
                                break;
                            case NONE:
                                break outer;
                            case BLACK:
                                table_ar[iNum][jNum] = BLACK;
                                for ( var i = 1; i < x; i++) {                                   
                                    table_ar[iNum][jNum - i] = BLACK;                                    
                                }
                                break;
                            default:
                        }                    
                    }
                }
            }
            //左上
            if ( iNum > 0 && jNum > 0 ) {
                if ( table_ar[iNum - 1][jNum - 1] === WHITE ) {
                    outer:
                    for ( var x = 1; x <= iNum; x++ ) {
                        switch ( table_ar[iNum - x][jNum - x] ) {
                            case WHITE:
                                break;
                            case NONE:
                                break outer;
                            case BLACK:
                                table_ar[iNum][jNum] = BLACK;
                                for ( var i = 1; i < x; i++) {                                   
                                    table_ar[iNum - i][jNum - i] = BLACK;                                    
                                }
                                break;
                            default:
                        }                    
                    }
                }
            }     
        }      
        //ここまで黒のひっくり返す処理          

        //白ターンの時の処理
        if ( !turn ) {
            //上
            if ( iNum > 0 ) {
                if ( table_ar[iNum - 1][jNum] === BLACK ) {
                    outer:
                    for ( var x = 1; x <= iNum; x++ ) {
                        switch ( table_ar[iNum - x][jNum] ) {
                            case BLACK:
                                break;
                            case NONE:
                                break outer;
                            case WHITE:
                                table_ar[iNum][jNum] = WHITE;
                                for ( var i = 1; i < x; i++) {
                                    table_ar[iNum - i][jNum] = WHITE;
                                }
                                break;
                            default:
                        }
                    }
                }
            } 
            //右上 
            if ( iNum > 0 && jNum < 7 ) {
                if ( table_ar[iNum - 1][jNum + 1] === BLACK ) {
                    outer:
                    for ( var x = 1; x <= iNum; x++ ) {
                        switch ( table_ar[iNum - x][jNum + x] ) {
                            case BLACK:
                                break;
                            case NONE:
                                break outer;
                            case WHITE:
                                table_ar[iNum][jNum] = WHITE;
                                for ( var i = 1; i < x; i++) {                                   
                                    table_ar[iNum - i][jNum + i] = WHITE;                                    
                                }
                                break;
                            default:
                        }                    
                    }
                }
            }
            //右
            if ( jNum < 7 ) {
                if ( table_ar[iNum][jNum + 1] === BLACK ) {
                    outer:
                    for ( var x = 1; x < (8 - jNum); x++ ) {
                        switch ( table_ar[iNum][jNum + x] ) {
                            case BLACK:
                                break;
                            case NONE:
                                break outer;
                            case WHITE:
                                table_ar[iNum][jNum] = WHITE;
                                for ( var i = 1; i < x; i++) {                                   
                                    table_ar[iNum][jNum + i] = WHITE;                                    
                                }
                                break;
                            default:
                        }                    
                    }
                }
            }
            //右下
            if ( iNum < 7 && jNum < 7 ) {
                if ( table_ar[iNum + 1][jNum + 1] === BLACK ) {
                    outer:
                    for ( var x = 1; x < (8 - iNum); x++ ) {
                        switch ( table_ar[iNum + x][jNum + x] ) {
                            case BLACK:
                                break;
                            case NONE:
                                break outer;
                            case WHITE:
                                table_ar[iNum][jNum] = WHITE;
                                for ( var i = 1; i < x; i++) {                                   
                                    table_ar[iNum + i][jNum + i] = WHITE;                                    
                                }
                                break;
                            default:
                        }                    
                    }
                }
            }
            //下
            if ( iNum < 7 ) {        
                if ( table_ar[iNum + 1][jNum] === BLACK ) {
                    outer:
                    for ( var x = 1; x < (8 - iNum); x++ ) {
                        switch ( table_ar[iNum + x][jNum] ) {
                            case BLACK:
                                break;
                            case NONE:
                                break outer;
                            case WHITE:
                                table_ar[iNum][jNum] = WHITE;
                                for ( var i = 1; i < x; i++) {                                   
                                    table_ar[iNum + i][jNum] = WHITE;                                    
                                }
                                break;
                            default:
                        }                    
                    }
                }
            }
            //左下
            if ( iNum < 7 && jNum > 0 ) {         
                if ( table_ar[iNum + 1][jNum - 1] === BLACK ) {
                    outer:
                    for ( var x = 1; x < (8 - iNum); x++ ) {
                        switch ( table_ar[iNum + x][jNum - x] ) {
                            case BLACK:
                                break;
                            case NONE:
                                break outer;
                            case WHITE:
                                table_ar[iNum][jNum] = WHITE;
                                for ( var i = 1; i < x; i++) {                                   
                                    table_ar[iNum + i][jNum - i] = WHITE;                                    
                                }
                                break;
                            default:
                        }                    
                    }
                }
            }
            //左
            if ( jNum > 0 ) {
                if ( table_ar[iNum][jNum - 1] === BLACK ) {
                    outer:
                    for ( var x = 1; x <= jNum; x++ ) {
                        switch ( table_ar[iNum][jNum - x] ) {
                            case BLACK:
                                break;
                            case NONE:
                                break outer;
                            case WHITE:
                                table_ar[iNum][jNum] = WHITE;
                                for ( var i = 1; i < x; i++) {                                   
                                    table_ar[iNum][jNum - i] = WHITE;                                    
                                }
                                break;
                            default:
                        }                    
                    }
                }
            }
            //左上
            if ( iNum > 0 && jNum > 0 ) {
                if ( table_ar[iNum - 1][jNum - 1] === BLACK ) {
                    outer:
                    for ( var x = 1; x <= iNum; x++ ) {
                        switch ( table_ar[iNum - x][jNum - x] ) {
                            case BLACK:
                                break;
                            case NONE:
                                break outer;
                            case WHITE:
                                table_ar[iNum][jNum] = WHITE;
                                for ( var i = 1; i < x; i++) {                                   
                                    table_ar[iNum - i][jNum - i] = WHITE;                                    
                                }
                                break;
                            default:
                        }                    
                    }
                }
            }
        }
    } else {
        //石が置いてある場所をクリックした場合、エラーメッセージ
        msg.textContent = "すでに石が置かれています。";
        setTimeout( function(){ msg.textContent = "" }, 3000)
    }
    draw(table_ar)
    count();
    //もしcountでtextContentに変更があったらchengeTurn
    if ( copyTableArr !== table_ar[iNum][jNum] ){
        chengeTurn();
    }
    if ( sumOfStone === 64 ) {
        finish();
    }
};

//table_arの情報から描写したい
function draw(db) {
    for ( var i = 0; i < 8; i++) {
        for ( var j = 0; j < 8; j++) {
            const cellId = "cell_" + i + j;
            const cellStone = document.getElementById(cellId);

            //描写
            if ( db[i][j] === BLACK ) {
                cellStone.textContent = STONE;
                cellStone.className =  "black";
            } 
            if ( db[i][j] === WHITE ) {
                cellStone.textContent = STONE;
                cellStone.className = "white";
            } 
        }
    }
};

//ターンを表示
function displayTurn() {
    if ( turn ) {
        textTurn.textContent = "黒のターン";
    } else {
        textTurn.textContent = "白のターン";
    };
    textBlack.textContent = "黒は" + sumOfBlack + "です。";
    textWhite.textContent = "白は" + sumOfWhite + "です。";
};

//ターンをチェンジ
function chengeTurn() {
    if ( turn ) {
        turn = false;
    } else {
        turn = true;
    }
    displayTurn();
};

// 石の合計をカウントしていく 
function count() {
    sumOfBlack = 0;
    sumOfWhite = 0;
    empty = 0;
    for ( var i = 0; i < 8; i++) {
        for ( var j = 0; j < 8; j++) {
            switch ( table_ar[i][j] ) {
                case BLACK:
                    sumOfBlack++;
                    break;
                case WHITE:
                    sumOfWhite++;
                    break;
                default:
                    empty++;
            }
        }
    }
    sumOfStone = sumOfBlack + sumOfWhite;
};

function finish() {
    console.log("aaa")
    if ( sumOfBlack > sumOfWhite ){
        textTurn.textContent = "黒の勝ち！"
    } else if ( sumOfWhite > sumOfBlack ) {
        textTurn.textContent = "白の勝ち！"
    } else {
        textTurn.textContent = "引き分け"
    }
};

init();

console.log(table_ar);