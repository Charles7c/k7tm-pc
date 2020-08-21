import { getAll as getCourse } from '@/api/base/course'
import { getAll as getStage } from '@/api/base/stage'

export function getBase(n) {
  if (n === 'course') {
    return getCourse(n)
  } else if (n === 'stage') {
    return getStage(n)
  }
}
