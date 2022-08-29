import { FC, useState, useEffect, useCallback } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHelpers'
import { addConfig, selectConfigs } from '../../redux/configsSlice'
import InputNumber from '../InputNumber'
import InputText from '../InputText'
import { countSettings } from '../../utils/countSettings'
import { createConfigs } from '../../utils/createConfigs'

export interface ConfigsSettingsForm {
  name: string
  buyFrom: number
  buyTo: number
  buyStep: number
  sellFrom: number
  sellTo: number
  sellStep: number
  stopFrom: number
  stopTo: number
  stopStep: number
}

const ConfigsSettings: FC = () => {
  const dispatch = useAppDispatch()
  const configs = useAppSelector(selectConfigs)
  const [configsCount, setConfigsCount] = useState(0)

  const {
    register,
    watch,
    formState: { isValid },
    handleSubmit,
  } = useForm<ConfigsSettingsForm>({ mode: 'onChange' })
  const watchInputs = watch()

  const updateConfigsCount = useCallback((): void => {
    const { buyFrom, buyTo, buyStep, sellFrom, sellTo, sellStep, stopFrom, stopTo, stopStep } =
      watchInputs

    const buySettingsCount = countSettings(+buyFrom, +buyTo, +buyStep)
    const sellSettingsCount = countSettings(+sellFrom, +sellTo, +sellStep)
    const stopSettingsCount = countSettings(+stopFrom, +stopTo, +stopStep)

    const configsTotalCount = buySettingsCount * sellSettingsCount * stopSettingsCount

    if (configsTotalCount > 0) {
      setConfigsCount(configsTotalCount)
    } else {
      setConfigsCount(0)
    }
  }, [watchInputs])

  useEffect(() => {
    updateConfigsCount()
  }, [watch, updateConfigsCount])

  const onSubmit: SubmitHandler<ConfigsSettingsForm> = (data): void => {
    if (isValid && configsCount > 0) {
      const {
        name,
        buyFrom,
        buyTo,
        buyStep,
        sellFrom,
        sellTo,
        sellStep,
        stopFrom,
        stopTo,
        stopStep,
      } = data

      const settings = {
        buy: { from: buyFrom, to: buyTo, step: buyStep },
        sell: { from: sellFrom, to: sellTo, step: sellStep },
        stop: { from: stopFrom, to: stopTo, step: stopStep },
      }

      const configItem = {
        name,
        configs: createConfigs(settings),
      }

      dispatch(addConfig(configItem))
    }
  }

  const inputWidth = 'w-24'
  const inputStep = 0.1
  const gridItemStyle = 'border border-neutral-900 py-1 px-3 text-center'
  const minPercent = 0.5
  const minStep = 0.1

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-center text-xl font-bold">Configs Settings</h3>

      <span className="text-lg font-medium">Config name: </span>
      <InputText {...register('name', { required: true })} autoComplete="off" />

      <div className="grid h-fit grid-cols-4 text-base">
        <span className={`${gridItemStyle} bg-slate-200 font-medium`}>Setting</span>
        <span className={`${gridItemStyle} bg-slate-200 font-medium`}>From, %</span>
        <span className={`${gridItemStyle} bg-slate-200 font-medium`}>To, %</span>
        <span className={`${gridItemStyle} bg-slate-200 font-medium`}>Step, %</span>

        <span className={`${gridItemStyle} bg-blue-100 font-medium`}>Buy</span>
        <InputNumber
          {...register('buyFrom', { required: true, min: minPercent })}
          className={`${inputWidth} ${gridItemStyle} bg-blue-100`}
          step={inputStep}
          defaultValue={3}
          min={minPercent}
        />
        <InputNumber
          {...register('buyTo', { required: true, min: minPercent })}
          className={`${inputWidth} ${gridItemStyle} bg-blue-100`}
          step={inputStep}
          defaultValue={5}
          min={minPercent}
        />
        <InputNumber
          {...register('buyStep', { required: true, min: minStep })}
          className={`${inputWidth} ${gridItemStyle} bg-blue-100`}
          step={inputStep}
          defaultValue={0.2}
          min={minStep}
        />

        <span className={`${gridItemStyle} bg-purple-100 font-medium`}>Sell</span>
        <InputNumber
          {...register('sellFrom', { required: true, min: minPercent })}
          className={`${inputWidth} ${gridItemStyle} bg-purple-100`}
          step={inputStep}
          defaultValue={1}
          min={minPercent}
        />
        <InputNumber
          {...register('sellTo', { required: true, min: minPercent })}
          className={`${inputWidth} ${gridItemStyle} bg-purple-100`}
          step={inputStep}
          defaultValue={2.5}
          min={minPercent}
        />
        <InputNumber
          {...register('sellStep', { required: true, min: minStep })}
          className={`${inputWidth} ${gridItemStyle} bg-purple-100`}
          step={inputStep}
          defaultValue={0.2}
          min={minStep}
        />

        <span className={`${gridItemStyle} bg-red-100 font-medium`}>Stop</span>
        <InputNumber
          {...register('stopFrom', { required: true, min: minPercent })}
          className={`${inputWidth} ${gridItemStyle} bg-red-100`}
          step={inputStep}
          defaultValue={2}
          min={minPercent}
        />
        <InputNumber
          {...register('stopTo', { required: true, min: minPercent })}
          className={`${inputWidth} ${gridItemStyle} bg-red-100`}
          step={inputStep}
          defaultValue={3.5}
          min={minPercent}
        />
        <InputNumber
          {...register('stopStep', { required: true, min: minStep })}
          className={`${inputWidth} ${gridItemStyle} bg-red-100`}
          step={inputStep}
          defaultValue={0.2}
          min={minStep}
        />
      </div>
      <p className="text-center text-base text-gray-400">Total configs: {configsCount}</p>
      <input
        type="submit"
        value="Create configs"
        className="w-full cursor-pointer rounded-md bg-neutral-900 py-2 px-4 text-base font-medium text-white hover:bg-neutral-800"
      />

      {!!configs.length &&
        configs.map((config) => <p key={`config-${config.name}`}>{config.name}</p>)}
    </form>
  )
}

export default ConfigsSettings
