import styles from './index.module.scss'

const EditList = ({ type, config, onClose }) => {
  const list = config[type]
  console.log(list)
  return (
    <div className={styles.root}>
      <div className="list-item" onClick={list[0].onClick}>{list[0].title}</div>
      <div className="list-item" onClick={list[1].onClick}>{list[1].title}</div>
      <div className="list-item" onClick={onClose}>取消</div>
    </div>
  )
}

export default EditList
