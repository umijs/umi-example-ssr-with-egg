import * as React from 'react';
import router from 'umi/router';
import { NavBar, Icon, Grid, Button, WhiteSpace} from 'antd-mobile';
import styles from './index.module.less';

const Discover: React.FC<{}> = () => {
  const renderItem = data => {
    return <div>{data.title}</div>;
  };
  const [num, setNum] = React.useState<number>(0);
  const items = [
    { title: '金币商城' },
    { title: '有红包快抢' },
    { title: '必吃爆料' },
    { title: '推荐有奖' },
    { title: '周边优惠' },
    { title: '百元红包' },
  ];

  return (
    <div>
      <NavBar onLeftClick={() => router.goBack()} mode="dark" icon={<Icon type="left" />}>
        发现
      </NavBar>
      <Grid data={items} columnNum={2} square={false} renderItem={renderItem} />
      <WhiteSpace />
      <Button onClick={() => setNum(prev => prev + 1)}>{num}</Button>
      <WhiteSpace />
      <div className={styles.recommend}>为你推荐</div>
    </div>
  );
}

export default Discover;
