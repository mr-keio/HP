import * as React from 'react'
import { Button, Modal } from 'antd'

const Vote: React.SFC<any> = ({
  canVotedToday,
  chooseCandidateId,
  chooseCandidateName,
  isModalVisible,
  isModalLoading,
  toggleModalVisible,
  vote,
  ready
}) => {
  return (
  <React.Fragment>
    <Button
      onClick={ready}
    >
      <p id='vote_title'>投票</p>
    </Button>
    <Modal
      title={chooseCandidateId ? `
        No.${chooseCandidateId} ${chooseCandidateName} に投票する
      ` : '読み込み中...'}
      visible={isModalVisible}
      centered={true}
      okText='投票する'
      cancelText='戻る'
      onOk={vote}
      okButtonProps={{
        loading: isModalLoading,
        disabled: !canVotedToday
      }}
      onCancel={toggleModalVisible}
    >
      {
        chooseCandidateId ? <React.Fragment>
          {
            canVotedToday ? (
              <p>
                「投票」ボタンを押した時点で
                <a href='../attentions.html'>投票にあたって</a>
                をご覧になったとみなして投票します。投票の修正は致しかねます。
              </p>
            ) : (
              <p>
                本日分の投票は済んでいます．明日以降の投票をお待ちしています．
              </p>
            )
          }
        </React.Fragment> : 'しばらくお待ちください。'
      }
    </Modal>
  </React.Fragment>
)}

export default Vote
