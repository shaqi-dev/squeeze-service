import { FC, useState, useEffect, useCallback } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHelpers'
import {
  ConfigItem,
  UniqueConfigItem,
  addConfig,
  selectConfigs,
  updateConfig,
  deleteConfig,
} from '../../redux/configsSlice'
import { ConfigSettings } from '../../types/ConfigSettings'
import { countSettings } from '../../utils/countSettings'
import { createConfigs } from '../../utils/createConfigs'
import InputNumber from '../InputNumber'
import InputText from '../InputText'

export interface ConfigsSettingsFormInputs {
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

enum ConfigsSettingsMode {
  CREATE,
  UPDATE,
}

const ConfigsSettings: FC = () => {
  const dispatch = useAppDispatch()
  const configs = useAppSelector(selectConfigs)

  const [configsCount, setConfigsCount] = useState(0)
  const [mode, setMode] = useState<ConfigsSettingsMode>(ConfigsSettingsMode.CREATE)
  const [selectedConfig, setSelectedConfig] = useState<UniqueConfigItem | null>(null)

  const {
    register,
    watch,
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ConfigsSettingsFormInputs>({ mode: 'onChange' })
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

  const onSubmit: SubmitHandler<ConfigsSettingsFormInputs> = (data): void => {
    if (isValid && configsCount > 0) {
      const { buyFrom, buyTo, buyStep, sellFrom, sellTo, sellStep, stopFrom, stopTo, stopStep } =
        data

      const settings: ConfigSettings = {
        buy: { from: buyFrom, to: buyTo, step: buyStep },
        sell: { from: sellFrom, to: sellTo, step: sellStep },
        stop: { from: stopFrom, to: stopTo, step: stopStep },
      }

      const configItem: ConfigItem = {
        data,
        configs: createConfigs(settings),
      }

      if (mode === ConfigsSettingsMode.CREATE) {
        dispatch(addConfig(configItem))
      } else if (mode === ConfigsSettingsMode.UPDATE && selectedConfig) {
        const uniqueConfigItem = { id: selectedConfig.id, ...configItem }
        dispatch(updateConfig(uniqueConfigItem))
        setMode(ConfigsSettingsMode.CREATE)
        setSelectedConfig(null)
      }

      reset({ name: '' })
    }
  }

  const handleCancelUpdate = (): void => {
    setMode(ConfigsSettingsMode.CREATE)
    setSelectedConfig(null)
    reset({ name: '' })
  }

  const handleClickConfig = (config: UniqueConfigItem): void => {
    console.log(config)
  }

  const handleUpdateConfig = (config: UniqueConfigItem): void => {
    reset(config.data)
    setMode(ConfigsSettingsMode.UPDATE)
    setSelectedConfig(config)
  }

  const handleDeleteConfig = (config: UniqueConfigItem): void => {
    if (selectedConfig?.id === config.id) {
      handleCancelUpdate()
    }

    dispatch(deleteConfig(config))
  }

  const inputWidth = 'w-24'
  const inputStep = 0.1
  const gridItemStyle = 'border border-neutral-900 py-1 px-3 text-center'
  const minPercent = 0.5
  const minStep = 0.1

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-center text-xl font-bold">Configs Settings</h3>
      <div className="flex gap-5">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
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
            value={mode === ConfigsSettingsMode.CREATE ? 'Create config' : 'Update config'}
            className="w-full cursor-pointer rounded-md bg-neutral-900 py-2 px-4 text-base font-medium text-white hover:bg-neutral-800"
          />
          {mode === ConfigsSettingsMode.UPDATE && (
            <input
              type="button"
              value="Cancel update"
              className="w-full cursor-pointer rounded-md border border-neutral-900 py-2 px-4 text-base font-medium text-neutral-800 hover:bg-neutral-200"
              onClick={handleCancelUpdate}
            />
          )}
        </form>
        <div>
          <p className="text-lg font-medium">Configs:</p>
          <div className="h-[calc(100%-28px)] min-w-[200px] border border-neutral-800">
            {configs.map((config) => (
              <div key={`config-${config.id}`} className="flex">
                <button
                  type="button"
                  className={
                    'w-full border border-neutral-800 hover:bg-neutral-200' +
                    `${selectedConfig?.id === config.id ? ' bg-neutral-200' : ''}`
                  }
                  onClick={(): void => handleClickConfig(config)}
                >
                  {config.data.name}
                </button>
                <button
                  type="button"
                  className="border border-neutral-800 px-2 hover:bg-neutral-200"
                  onClick={(): void => handleUpdateConfig(config)}
                >
                  U
                </button>
                <button
                  type="button"
                  className="border border-neutral-800 px-2 hover:bg-neutral-200"
                  onClick={(): void => handleDeleteConfig(config)}
                >
                  D
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfigsSettings
