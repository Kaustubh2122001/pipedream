board=[]
bs=5   #boardsize

for i in range(0,bs):
    board.append([])
    for j in range (0,bs):
        board[i].append(0)

def showboard():
    global board
    for i in range(0,bs):
            print( board[i])

count=0

def markplace(row,col):
    global board,bs,count,prow,pcol
    
    if count == bs*bs-0:
            print("Placed all knights")
            showboard()
            return True
    else:
        for i in range(0,bs):        
            for j in range(0,bs):
                if ( abs(i-row)== 2 and abs(j-col)==1 and board[i][j]==0)or \
                     ( abs(i-row)== 1 and abs(j-col)==2 and board[i][j]==0):

                    board[row][col]=count+1
                    count=count+1

                    if markplace(i,j)==True:
                        return True
                    else:
                        board[row][col]=0
                        count=count-1
    return False

if not markplace(0,0):
    print("Not Possible")
