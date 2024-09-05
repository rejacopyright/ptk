'use client'
import { loginUserInfo } from '@api/__MOCK/login'
import { login as loginUser, myInfo } from '@api/auth'
import { APP_HOME_PATH, APP_MODE, configClass, getJWTPayload } from '@helpers'
import { setUser } from '@redux'
import { persistKey } from '@redux/reducers/auth'
import clsx from 'clsx'
import { Field, Form, Formik, FormikProps } from 'formik'
import Cookies from 'js-cookie'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import * as Yup from 'yup'

// import LoginError from './_modals/LoginError'

const loginSchema: any = Yup.object().shape({
  email: Yup.string()
    .matches(new RegExp(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i), '이메일이 올바르지 않습니다.')
    .required('이메일은 필수입니다'),
  password: Yup.string()
    // .matches(/[!@#$%^&*(),.?":{}|<>]/, '특수기호 1개 이상')
    // .matches(/[a-z]/, '대소문자 포함')
    // .matches(/[A-Z]/, '대소문자 포함')
    // .matches(/[0-9]/, '숫자 1개 이상')
    // .min(8, () => '8자 이상')
    .required('비밀번호가 필요합니다'),
})

const Login = ({ searchParams }) => {
  const router = useRouter()
  const { email = '', request } = searchParams || {}
  let nextRequest: any = request

  const [status, setStatus] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [passwordShown, setPasswordShown] = useState<boolean>(false)

  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }

  const handleOnSubmit = (values) => {
    localStorage.removeItem(`persist:${persistKey}`)
    setLoading(true)
    loginUser({ user_eml: values?.email, user_pswd: values?.password })
      .then(async ({ data: { message } }: any) => {
        const { reason, token } = message || {}
        const payload: any = getJWTPayload(token)
        const userId: any = payload?.sub

        // Redirect Conditions
        if (nextRequest) {
          switch (atob(nextRequest)) {
            case '/wallet/detail':
              nextRequest = btoa(APP_HOME_PATH)
              break
          }
        }

        if (reason === 'success') {
          await myInfo(userId, token).then(({ data }: any) => {
            const user_info: any = data?.message?.user_info || {}
            const combinedUser: any = {
              ...(user_info?.user_info || {}),
              mails: user_info?.user_mail_infos || [],
            }
            if (data?.message?.reason === 'success') {
              // setToken(token)
              Cookies.set(`token`, token, { expires: moment.unix(payload?.exp).toDate() })
              setUser(combinedUser)
            }
          })
          setStatus(null)
          setTimeout(() => {
            window.location.href = nextRequest ? atob(nextRequest) : APP_HOME_PATH
          }, 300)
        }
      })
      .catch((err: any) => {
        const message: any = err?.response?.data?.message?.reason || err?.message || ''
        const statusCode: any = err?.response?.data?.code
        setStatus(message)
        router.push(
          `/login/error?email=${values?.email}&statusCode=${statusCode}&message=${message}`,
          { scroll: false }
        )
      })
      .finally(() => {
        setLoading(false)
      })

    if (APP_MODE === 'test') {
      Cookies.set(`token`, 'token', { expires: moment().add(2, 'h').toDate() })
      setUser(loginUserInfo)
      setStatus(null)
      setTimeout(() => {
        window.location.href = nextRequest ? atob(nextRequest) : APP_HOME_PATH
      }, 300)
    }
  }

  return (
    <>
      <Formik
        initialValues={{
          email,
          password: '',
        }}
        validationSchema={loginSchema}
        enableReinitialize
        validateOnChange
        validateOnMount
        onSubmit={handleOnSubmit}>
        {(formik: FormikProps<{ email: string; password: string }>) => {
          const { touched, errors, isValid } = formik || {}
          return (
            <div style={{ width: '95vw' }}>
              <div className='row'>
                <div className='col-12'>
                  <div className='text-center' style={{ marginBottom: '36px' }}>
                    <Image
                      alt='Logo'
                      src='/logo/potentok.png'
                      width={168}
                      height={34}
                      className='mb-8px'
                    />
                    <div className='fw-600 fs-14px'>
                      지금 바로, 태권도 전자승급증을 발급받아보세요!
                    </div>
                  </div>
                  <div
                    className='w-md-360px px-md-0 px-5 mx-auto'
                    style={{ backgroundColor: 'rgba(255,255,255,.85)' }}>
                    <Form className='justify-content-center' noValidate id='form-auth'>
                      <div className='fv-row mb-24px'>
                        <div className={configClass?.label}>이메일</div>
                        <Field
                          className={clsx('bg-white', configClass?.form, {
                            'border-gray-300': !touched?.email,
                            'is-invalid-xxx': touched?.email && errors?.email,
                            'is-valid-xxx': touched?.email && !errors?.email,
                          })}
                          type='email'
                          name='email'
                          placeholder='이메일을 입력해 주세요.'
                          autoComplete='off'
                        />
                        {touched?.email && errors?.email ? (
                          <div className='form-error'>{errors?.email || ''}</div>
                        ) : (
                          status !== null && <div className='form-error'>{status || ''}</div>
                        )}
                      </div>

                      <div className='fv-row mb-24px'>
                        <div className={configClass?.label}>비밀번호</div>
                        <div className='input-group input-group-solid d-flex align-items-center bg-white border border-gray-300 overflow-hidden h-40px'>
                          <Field
                            type={passwordShown ? 'text' : 'password'}
                            // placeholder='Password'
                            autoComplete='off'
                            name='password'
                            placeholder='비밀번호를 입력해 주세요.'
                            className={`bg-white border-0 ${configClass?.form}`}
                          />
                          <div className='px-3 d-flex h-100 flex-center' onClick={togglePassword}>
                            {passwordShown && <i className='las la-eye fs-2 mt-1' />}
                            {!passwordShown && <i className='las la-eye-slash fs-2 mt-1' />}
                          </div>
                        </div>
                        {touched?.password && errors?.password && (
                          <div className='form-error'>{errors?.password || ''}</div>
                        )}
                      </div>

                      {/* <div className='fv-row mb-5 mt-n5'>
                      <label>
                        <div className='form-check'>
                          <Field
                            className='form-check-input'
                            name='remember'
                            type='checkbox'
                            // checked={false}
                            onClick={() => ''}
                          />
                          <div className='cursor-pointer fw-bold'>Remember Me</div>
                        </div>
                      </label>
                    </div> */}
                      <div className='text-center'>
                        <button
                          type={isValid ? 'submit' : 'button'}
                          className={clsx('btn w-100 fw-600 fs-6 h-40px mb-24px', {
                            'btn-primary': isValid,
                            'bg-secondary text-gray-600 cursor-na': !isValid,
                          })}
                          // disabled={!isValid}
                        >
                          {!loading && <span className='indicator-label'>로그인</span>}
                          {loading && (
                            <span className='indicator-progress' style={{ display: 'block' }}>
                              기다리세요...
                              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                            </span>
                          )}
                        </button>
                        {/* <div className='fw-bolder mb-5 fs-5'>OR</div>
                      <div className='d-flex flex-center'>
                        <GoogleLogin
                          onSuccess={(e: any) => {
                            const payload: any = getJWTPayload(e?.credential)
                            setFieldValue('email', payload?.email)
                          }}
                          onError={() => ''}
                          useOneTap
                        />
                      </div> */}
                        <div className='d-flex flex-center'>
                          {/* <div className='text-gray-700 me-2'>No Account ?</div> */}
                          <Link href='/register/email' className='text-primary fw-bolder'>
                            회원가입
                          </Link>
                        </div>
                      </div>
                    </Form>
                    <div
                      className='text-center mt-36px border-top d-flex align-items-end justify-content-center'
                      style={{ height: '36px' }}>
                      <Link
                        tabIndex={-1}
                        href='/password/forgot'
                        className='link-primary fw-bolder text-gray-500'
                        style={{ marginLeft: '5px' }}>
                        비밀번호를 잊으셨나요?
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </Formik>
      {/* <LoginError
        show={showModalNoAccount}
        setShow={setShowModalNoAccount}
        message={status}
        code={statusCode}
      /> */}
    </>
  )
}

export default Login
