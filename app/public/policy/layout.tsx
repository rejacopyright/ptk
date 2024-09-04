export async function generateMetadata() {
  return {
    metadataBase: new URL('https://dev.potentok.com'),
    title: '개인정보 수집/이용 동의',
    description:
      'Potentok (saforus.com )를 운영하는 주식회사 마크애니(이하 “회사”)는 정보주체(이하 “사용자”라 함)의 개인정보보호를 중요시하며, 개인정보를 보호하기 위해서 “정보통신망 이용촉진 및 정보보호 등에 관한 법률”, “개인정보 보호법” 등 정보통신서비스제공자가 준수하여야 할 관련 법령상의 개인정보보호 규정을 준수하며 관련 법령에 의거한 개인정보 처리방침을 정하여 사용자의 권익 보호에 최선을 다하고 있습니다.',
  }
}
export { default } from '@pages/(user)/layout'
