import {
  compose,
  lifecycle,
  withHandlers,
  withStateHandlers
} from 'recompose'
import * as moment from 'moment'
import { message, Modal } from 'antd'
import { bases } from '../constants'

import VoteComponentsfrom from '../components/Vote'
import { read, signInAnonymously, getUserID, set } from '../firebase'

type State = {
  chooseCandidateId?: number | null
  chooseCandidateName?: string
  canVotedToday?: boolean
  isModalLoading?: boolean
  isModalVisible?: boolean
  isEnableBrowser?: boolean
  now?: string
  uid?: string
  myVotes?: object
  happyWindow?: boolean
  // userAgent?: string
}

type StateUpdates = {
  setDefaultStates: ({
    canVotedToday,
    now,
    uid,
    chooseCandidateId
  }: State) => State
  toggleModalVisible: () => State
  toggleModalLoading: () => State
  enableBrowser: (b: boolean) => State
  setMyVotes: (votes: State) => State
  toggleHappyWindow: () => State
  // setUserAgent: ({ userAgent}: State) => State
}

const WithStateHandlers = withStateHandlers <State, StateUpdates> (
  {
    isModalLoading: false,
    isModalVisible: false,
    isEnableBrowser: false,
    canVotedToday: false,
    now: '',
    uid: '',
    chooseCandidateId: null,
    chooseCandidateName: '',
    myVotes: {},
    happyWindow: false
    // userAgent: ''
  },
  {
    setDefaultStates: (props) => ({
      canVotedToday,
      now,
      uid,
      chooseCandidateId,
      chooseCandidateName
    }: State ) => ({
      ...props,
      canVotedToday,
      now,
      uid,
      chooseCandidateId,
      chooseCandidateName
    }),
    toggleModalVisible: (props) => () => ({ ...props, isModalVisible: !props.isModalVisible }),
    toggleModalLoading: (props) => () => ({ ...props, isModalLoading: !props.isModalLoading }),
    toggleHappyWindow: (props) => () => ({ ...props, happyWindow: !props.happyWindow }),
    enableBrowser: (props) => (b) => ({ ...props, isEnableBrowser: b }),
    setMyVotes: (props) => (myVotes) => ({ ...props, myVotes })
    // setUserAgent: () => ({ userAgent }) => ({ userAgent })
  }
)

function getNow () : string {
  return moment(new Date()).format('YYYY-MM-DD-HH-mm').toString()
}

function getChooseCandidateId (): string {
  const currentPath = location.href
  const currentFileName = currentPath.split('/')[currentPath.split('/').length-1]
  const chooseCandidateId = currentFileName.split('.')[0].split('no')[1]
  return chooseCandidateId
}

function getChooseCandidateName (id: number): string {
  return bases[`no${id}`].name
}

// function isEnableBrowser (): boolean {
//   const UA = navigator.userAgent
//   if (UA.match(/instagram/) || UA.match(/FB/)) {
//     return false
//   } else {
//     return true
//   }
// }

const WithHandlers = withHandlers <any, {}> ({
  ready: ({
    setDefaultStates,
    toggleModalLoading,
    toggleModalVisible,
    setMyVotes
  }) => () => {
    toggleModalLoading()
    toggleModalVisible()
    signInAnonymously()
      .then(async () => {
        const uid = getUserID()
        const now = getNow()

        const voterPath = `/voters/${uid}/`
        const myVotes = (await read(voterPath)).val()

        setMyVotes(myVotes)

        const compare = now.split('-').slice(0, 3).join('-')
        let flag = 0
        if (myVotes) {
          Object.keys(myVotes).forEach((key: string) => {
            const { date } = myVotes[key]
            const voted = date.split('-').slice(0, 3).join('-')
            if (compare === voted) {
              flag = 1
            }
          })
        }
        const chooseCandidateId = Number(getChooseCandidateId())
        setDefaultStates({
          canVotedToday: flag ? false : true,
          chooseCandidateId,
          chooseCandidateName: getChooseCandidateName(chooseCandidateId),
          now,
          uid,
        })
        toggleModalLoading()
      })
      .catch((err) => {
        message.error(`サーバーとの認証中にエラーが発生しました。時間をおいてアクセスしてください。：${err}`)
      })
  },
  vote: ({
    canVotedToday,
    chooseCandidateId,
    now,
    uid,
    myVotes,
    toggleModalLoading,
    toggleModalVisible,
    toggleHappyWindow,
    chooseCandidateName
  }) => () => {
    if (!canVotedToday) return
    const rootPath = `/voters/${uid}`
    const today = now.split('-').slice(0, 3).join('-')
    toggleModalLoading()
    set(`${rootPath}`, {
      [today]: {
        voteFor: chooseCandidateId,
        date: now,
        userAgent: navigator.userAgent
      }
    }).then(() => {
      toggleModalLoading()
      toggleModalVisible()

      let info: any = {}
      Object.keys(myVotes).forEach((date) => {
        console.log(myVotes[date])
        
        const { voteFor } = myVotes[date]
        if (typeof info[voteFor] === 'number') {
          info[voteFor] += 1
        } else {
          info[voteFor] = 1
        }
      })

      if (info[chooseCandidateId]) {
        if (
          info[chooseCandidateId] === 1 ||
          info[chooseCandidateId] === 5 ||
          ( info[chooseCandidateId] <= 50 && info[chooseCandidateId] % 10 === 0) ||
          ( info[chooseCandidateId] > 50 && info[chooseCandidateId] % 50 === 0)
        ) {
          const modal = Modal.success({
            title: 'おめでとうございます！',
            content:　`${chooseCandidateName}への記念すべき${info[chooseCandidateId]}回目の投票です！`
          })
        } else {
          message.success('投票しました')
        }
      }
    }).catch((err) => {
      message.error(`投票する際にエラーが発生しました。時間をおいて再度アクセスしてください。：${err}`)
    })
  }
})

const Lifecycle = lifecycle <any, any> ({
  async componentDidMount () {
    // this.props.setUserAgent({userAgent: navigator.userAgent})
  }
})


const Vote = compose(
  WithStateHandlers,
  WithHandlers,
  Lifecycle
)(VoteComponentsfrom)

export default Vote
