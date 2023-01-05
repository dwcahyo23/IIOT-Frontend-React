import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../store';
import ItemsHeader from './ItemsHeader';
import ItemsTable from './ItemsTable';

function Items() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<ItemsHeader />}
      content={<ItemsTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('mnPreventiveApp', reducer)(Items);
