import { FC, useState, useRef, FormEventHandler } from 'react'
import InputNumber from '../InputNumber'
import { countSettings } from '../../utils/countSettings'
import { createConfigs } from '../../utils/createConfigs'

const ConfigsSettings: FC = () => {
  const inputWidth = 'w-24'
  const inputStep = 0.1
  const gridItemStyle = 'border border-neutral-900 py-1 px-3 text-center'

  const [configsCount, setConfigsCount] = useState(0)

  const buyFrom = useRef<HTMLInputElement>(null)
  const buyTo = useRef<HTMLInputElement>(null)
  const buyStep = useRef<HTMLInputElement>(null)
  const sellFrom = useRef<HTMLInputElement>(null)
  const sellTo = useRef<HTMLInputElement>(null)
  const sellStep = useRef<HTMLInputElement>(null)
  const stopFrom = useRef<HTMLInputElement>(null)
  const stopTo = useRef<HTMLInputElement>(null)
  const stopStep = useRef<HTMLInputElement>(null)

  const settings = {
    buy: {
      from: Number(buyFrom.current?.value),
      to: Number(buyTo.current?.value),
      step: Number(buyStep.current?.value),
    },
    sell: {
      from: Number(sellFrom.current?.value),
      to: Number(sellTo.current?.value),
      step: Number(sellStep.current?.value),
    },
    stop: {
      from: Number(stopFrom.current?.value),
      to: Number(stopTo.current?.value),
      step: Number(stopStep.current?.value),
    },
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e): void => {
    e.preventDefault()
    createConfigs(settings)
  }

  const handleChangeForm = (): void => {
    if (
      buyFrom.current &&
      buyTo.current &&
      buyStep.current &&
      sellFrom.current &&
      sellTo.current &&
      sellStep.current &&
      stopFrom.current &&
      stopTo.current &&
      stopStep.current
    ) {
      const buySettingsCount = countSettings(
        +buyFrom.current.value,
        +buyTo.current.value,
        +buyStep.current.value,
      )
      const sellSettingsCount = countSettings(
        +sellFrom.current.value,
        +sellTo.current.value,
        +sellStep.current.value,
      )
      const stopSettingsCount = countSettings(
        +stopFrom.current.value,
        +stopTo.current.value,
        +stopStep.current.value,
      )

      const configsTotalCount = buySettingsCount * sellSettingsCount * stopSettingsCount

      if (configsTotalCount > 0) {
        setConfigsCount(configsTotalCount)
      } else {
        setConfigsCount(0)
      }
    }
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit} onChange={handleChangeForm}>
      <h3 className="text-center text-xl font-bold">Configs Settings</h3>

      <div className="grid h-fit grid-cols-4 text-base">
        <span className={`${gridItemStyle} bg-slate-200 font-medium`}>Setting</span>
        <span className={`${gridItemStyle} bg-slate-200 font-medium`}>From, %</span>
        <span className={`${gridItemStyle} bg-slate-200 font-medium`}>To, %</span>
        <span className={`${gridItemStyle} bg-slate-200 font-medium`}>Step, %</span>

        <span className={`${gridItemStyle} bg-blue-100 font-medium`}>Buy</span>
        <InputNumber
          ref={buyFrom}
          className={`${inputWidth} ${gridItemStyle} bg-blue-100`}
          step={inputStep}
          defaultValue={3}
          min={0}
        />
        <InputNumber
          ref={buyTo}
          className={`${inputWidth} ${gridItemStyle} bg-blue-100`}
          step={inputStep}
          defaultValue={5}
          min={0}
        />
        <InputNumber
          ref={buyStep}
          className={`${inputWidth} ${gridItemStyle} bg-blue-100`}
          step={inputStep}
          defaultValue={0.2}
          min={0}
        />

        <span className={`${gridItemStyle} bg-purple-100 font-medium`}>Sell</span>
        <InputNumber
          ref={sellFrom}
          className={`${inputWidth} ${gridItemStyle} bg-purple-100`}
          step={inputStep}
          defaultValue={1}
          min={0}
        />
        <InputNumber
          ref={sellTo}
          className={`${inputWidth} ${gridItemStyle} bg-purple-100`}
          step={inputStep}
          defaultValue={2.5}
          min={0}
        />
        <InputNumber
          ref={sellStep}
          className={`${inputWidth} ${gridItemStyle} bg-purple-100`}
          step={inputStep}
          defaultValue={0.2}
          min={0}
        />

        <span className={`${gridItemStyle} bg-red-100 font-medium`}>Stop</span>
        <InputNumber
          ref={stopFrom}
          className={`${inputWidth} ${gridItemStyle} bg-red-100`}
          step={inputStep}
          defaultValue={2}
          min={0}
        />
        <InputNumber
          ref={stopTo}
          className={`${inputWidth} ${gridItemStyle} bg-red-100`}
          step={inputStep}
          defaultValue={3.5}
          min={0}
        />
        <InputNumber
          ref={stopStep}
          className={`${inputWidth} ${gridItemStyle} bg-red-100`}
          step={inputStep}
          defaultValue={0.2}
          min={0}
        />
      </div>
      <p className="text-center text-base text-gray-400">Total configs: {configsCount}</p>
      <input
        type="submit"
        value="Create configs"
        className="w-full cursor-pointer rounded-md bg-neutral-900 py-2 px-4 text-base font-medium text-white hover:bg-neutral-800"
      />
    </form>
  )
}

export default ConfigsSettings
