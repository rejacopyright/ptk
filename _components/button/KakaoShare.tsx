// KakaoShare.jsx
import { FC, useEffect } from 'react'

interface Props {
  title: string
  description: string
  imageUrl: string
  link: string
}

const Index: FC<Props> = ({
  title = 'Potentok',
  description = 'Potentok',
  imageUrl = '#',
  link = '#',
}) => {
  const win: any = window

  useEffect(() => {
    kakaoButton()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const kakaoButton = () => {
    if (win?.Kakao) {
      const kakao = win?.Kakao

      if (!kakao.isInitialized()) {
        kakao.init('b38cf47cd032ccabd3bb57d8448a582a')
      }

      kakao.Share.createDefaultButton({
        container: '#kakaotalk-sharing-btn',
        objectType: 'feed',
        content: {
          title,
          description,
          imageUrl,
          link: {
            // Must match the site domain registered in [My Application] > [Platform]
            mobileWebUrl: link,
            webUrl: link,
          },
        },
        // social: {
        //   likeCount: 286,
        //   commentCount: 45,
        //   sharedCount: 845,
        // },
        buttons: [
          {
            title: '배지 구경하기',
            link: {
              mobileWebUrl: link,
              webUrl: link,
            },
          },
        ],
      })
    }
  }

  return (
    <button
      id='kakaotalk-sharing-btn'
      className='btn btn-flex flex-center gap-10px h-36px btn-white text-dark border border-gray-300 radius-5 px-8px shadow-xs'>
      <img
        src='https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png'
        alt='Kakao Talk sharing button'
        className='h-22px'
      />
      <div className='fs-14px ls-n1'>카카오톡</div>
    </button>
  )
}

export default Index
