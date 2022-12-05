import { useForm, Controller } from 'react-hook-form'
import { createTopic } from '../firebase/firestore'
import { selectActivePeriod, selectPeriods } from '../redux/features/topicSlice'
import { selectUser, selectUserId } from '../redux/features/userSlice'
import { useAppSelector } from '../redux/store'
import Topic from '../utils/types/Topic'
import { Educator } from '../utils/types/User'
import Button from './Button'
import Input from './Input'
import SelectInput from './SelectInput'

import TagInputComponent from './TagInputComponent'

type TopicData = {
  name: string
  description: string
  outcome: string[]
  periodId: string
  numberOfStudent: number
}

const defaultValues: TopicData = {
  name: '',
  description: '',
  outcome: [],
  periodId: '',
  numberOfStudent: 3,
}

type CreateTopicProps = {
  onClose: () => void
}

function CreateTopic({ onClose }: CreateTopicProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TopicData>({
    defaultValues,
  })

  const periods = useAppSelector(selectActivePeriod)

  const allPeriods = periods.map((period) => ({
    value: period.id,
    label: period.name,
  }))

  const user = useAppSelector(selectUser)

  function onSubmit(data: TopicData) {
    if (user) {
      const educator = user as Educator
      const { name, description, outcome, periodId, numberOfStudent } = data

      const topic: Topic = {
        name,
        description,
        outcomes: outcome,
        numberOfMembers: numberOfStudent,
        evaluationMembers: [],
        members: [],
        specialization: educator.specialization,
        educatorId: educator.id,
        id: '',
      }

      createTopic(periodId, topic)

      reset()
    }
  }

  return (
    <div className='fixed w-[500px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 pt-8 pb-4 rounded-lg shadow-lg'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
        {/* <input
          className='w-full p-2 border border-gray-300 rounded-lg focus:ring focus:outline-none'
          type='text'
          placeholder='Tên đề tài'
          {...register('name', {
            required: true,
            maxLength: 80,
          })}
        />
        */}

        <Controller
          name='name'
          control={control}
          rules={{
            required: true,
            maxLength: 80,
          }}
          render={({ field }) => <Input {...field} placeholder='Tên đề tài' />}
        />

        <Controller
          name='description'
          control={control}
          rules={{
            required: true,
            maxLength: 150,
          }}
          render={({ field }) => (
            <Input
              {...field}
              error={errors.description && errors.description.message}
              placeholder='Mô tả'
            />
          )}
        />

        <div className='grid grid-cols-3 gap-2'>
          <div className='col-span-2'>
            <Controller
              name='periodId'
              control={control}
              render={({ field: { onChange } }) => (
                <SelectInput options={allPeriods} onChange={onChange} />
              )}
            />
          </div>

          <Controller
            name='numberOfStudent'
            control={control}
            rules={{
              required: true,
              min: 1,
              max: 5,
            }}
            render={({ field }) => (
              <Input
                {...field}
                error={errors.name && errors.name.message}
                placeholder='Số lượng sinh viên tối đa'
              />
            )}
          />
        </div>

        <Controller
          name='outcome'
          control={control}
          render={({ field: { value, onChange } }) => (
            <TagInputComponent value={value} onChange={onChange} />
          )}
        />

        <div className='flex justify-end gap-2'>
          <Button buttonType='info' onClick={onClose}>
            Hủy
          </Button>
          <Button
            type='submit'
            buttonType='primary'
            onClick={(e) => {
              handleSubmit(onSubmit)
            }}
          >
            Thêm đề tài
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateTopic
