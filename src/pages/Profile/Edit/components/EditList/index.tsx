/*
 * @Author: chenjie
 * @Date: 2022-07-22 14:05:14
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-25 16:42:45
 * @FilePath: /src/pages/Profile/Edit/components/EditList/index.tsx
 * @Description: null
 */
import styles from './index.module.scss'
type Props = {
  type: 'name' | 'intro' | 'gender' | 'photo' | '',
  onClose: () => void
  updateProfile: (key: Props['type'], value: string) => void
}
const genderList = [
  { text: '男', value: '0' },
  { text: '女', value: '1' },
];

const photoList = [
  { text: '拍照', value: '' },
  { text: '本地选择', value: '' },
];
const EditList = ({ type, onClose, updateProfile }: Props) => {
  const onItemClick = (value: string) => {
    updateProfile(type, value)
  }
  return (
    <div className={styles.root}>
      {type === 'gender' ?
       <>
        {genderList.map(item => <div className="list-item" key={item.value} onClick={() => onItemClick(item.value)}>{item.text}</div>)}
       </> :
       <>
        {photoList.map(item => <div className="list-item" key={item.text} onClick={() => onItemClick(item.value)}>{item.text}</div>)}
      </>}
      <div className="list-item" onClick={onClose}>取消</div>
    </div>
  )
}

export default EditList
