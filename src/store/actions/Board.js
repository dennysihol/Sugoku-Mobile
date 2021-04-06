import axios from "axios"

export const fetchBoard = (payload) => ({
    type: 'board/fetch',
    payload
})

export const fetchBoardAsync = (level) => {
    return (dispatch) => {
        return (
            axios({
                method: 'GET',
                url: `https://sugoku.herokuapp.com/board?difficulty=${level}`
              })
                .then(({data}) => {
                    dispatch(fetchBoard(data.board))
                })
                .catch((err) => {
                    console.log(err);
                })
        )
    }
}