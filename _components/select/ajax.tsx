import './style.scss'

import { useDeepEffect } from '@hooks'
import { debounce, differenceWith, isEqual, uniqBy } from 'lodash'
import qs from 'qs'
import { FC, forwardRef, memo, useState } from 'react'
import ReactSelect from 'react-select'

import {
  ClearIndicator,
  customStyles,
  DropdownIndicator,
  MultiValueRemove,
  SelectTypes,
} from './config'

const SelectAjax: any = (
  {
    name,
    placeholder,
    onChange,
    data,
    defaultValue,
    multiple,
    params = {},
    limit = 10,
    resultParams,
    api,
    parse,
    id = '',
    className = '',
    sm = false,
    removeOption = [],
    resetOption,
    setResetOption,
    clearOption,
    isClearable = true,
    isDisabled = false,
    isMulti = false,
    styleOption = {},
    DropdownElement,
    ClearElement,
    MultiValueElement,
    formatOptionLabel = () => '',
  }: SelectTypes,
  ref: any
) => {
  const [isLoading, setIsLoading] = useState<any>(false)
  const [page, setPage] = useState<any>(1)
  const [query, setQuery] = useState<any>('')
  const [queryParams, setQueryParams] = useState<any>({})
  const [options, setOptions] = useState<any>([])
  const [value, setValue] = useState<any>(undefined)

  useDeepEffect(() => {
    setPage(1)
  }, [isLoading])

  useDeepEffect(() => {
    setTimeout(() => {
      setQueryParams((prev: any) => {
        prev = qs.parse(prev)
        if (
          prev?.filter &&
          !Object.values(prev?.filter || {})?.includes('-') &&
          JSON.stringify(prev || {}) !== JSON.stringify(params || {})
        ) {
          setOptions([])
          setValue(undefined)
          onChange && onChange({})
        }
        return params
      })
    }, 100)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  const mapApi: any = ({ page: _page = 1, query: _query = '' }: any) => {
    setIsLoading(true)
    api({ ...queryParams, page: _page, limit, keyword: `*${_query}*` })
      .then(({ data: { data: res } }: any) => {
        const data: any = res?.data || res
        if (data?.length) {
          const mapParse: any = data.map((e: any) => parse(e))
          setOptions((prev: any) => {
            if (
              !!prev?.length &&
              JSON.stringify(Object.values(prev || {})) !==
                JSON.stringify(Object.values(mapParse || {}))
            ) {
              const orderedCurrentData: any = mapParse
              const result: any = uniqBy((prev || []).concat(orderedCurrentData), 'value')
              return result
            } else {
              const result: any = mapParse
              return result
            }
          })
        }
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }

  useDeepEffect(() => {
    if (defaultValue?.value) {
      setOptions([defaultValue])
      setValue(defaultValue?.value)
      onChange && onChange(defaultValue)
    } else {
      setValue(undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue])

  const onMenuOpen = () => {
    if (parse) {
      mapApi({ page: 1 })
    }
  }

  const onMenuClose = () => {
    setQuery('')
    setOptions(value ? (typeof value === 'string' ? [defaultValue] : [value]) : [])
  }

  useDeepEffect(() => {
    if (resetOption === true) {
      setQuery('')
      setValue(defaultValue?.value) // used in reset form, (setup>preference)
      setTimeout(() => {
        setResetOption(false)
      }, 500)
    }

    if (clearOption === true) {
      setQuery('')
      setOptions([])
    }
  }, [resetOption, setResetOption, defaultValue?.value, clearOption])

  const applyDebounce = debounce(
    (e: any) => {
      setQuery(e)
      mapApi({ page: 1, query: e })
    },
    1500,
    { leading: false, trailing: true }
  )

  const onInputChange = (e: any, ev: any) => {
    if (ev?.action === 'input-change') {
      setPage(1)
      setIsLoading(true)
      resultParams && resultParams({ page: 1, q: e })
      if (e) {
        applyDebounce(e)
      } else {
        setQuery('')
        mapApi({ page: 1 })
      }
    } else {
      setIsLoading(false)
    }
  }

  const scrollToBottom = () => {
    if (data !== options) {
      mapApi({ page: page + 1, query })
      setPage((p: any) => {
        ++p
        return p
      })
      resultParams && resultParams({ page, q: query })
    } else {
      resultParams && resultParams({ page: 1, q: query })
    }
    setIsLoading(false)
  }

  return (
    <div className={className}>
      <ReactSelect
        ref={ref}
        formatOptionLabel={formatOptionLabel}
        inputId={id}
        styles={customStyles(sm, styleOption)}
        components={{
          DropdownIndicator: DropdownElement || DropdownIndicator,
          ClearIndicator: ClearElement || ClearIndicator,
          MultiValueRemove: MultiValueElement || MultiValueRemove,
        }}
        name={name}
        placeholder={placeholder}
        noOptionsMessage={(e: any) => (e.inputValue = 'No Data...')}
        isLoading={isLoading}
        isMulti={isMulti}
        closeMenuOnSelect={multiple ? false : true}
        controlShouldRenderValue
        isClearable={isClearable}
        value={value ? options?.find((f: any) => f?.value === value) : ''}
        // inputValue={query}
        options={
          removeOption.lenght === 0 ? options : differenceWith(options, removeOption, isEqual)
        }
        onInputChange={onInputChange}
        onChange={(e: any) => {
          setQuery('')
          setValue(e || { value: '' })
          onChange && onChange(e || { value: '' })
        }}
        onMenuOpen={onMenuOpen}
        onMenuClose={onMenuClose}
        onMenuScrollToBottom={scrollToBottom}
        isDisabled={isDisabled}
      />
    </div>
  )
}

const Select: FC<SelectTypes> = memo(
  forwardRef(SelectAjax),
  (prev: any, next: any) => JSON.stringify(prev) === JSON.stringify(next)
)
export { Select }
