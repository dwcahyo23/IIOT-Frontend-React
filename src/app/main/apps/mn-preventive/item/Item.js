import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect, useThemeMediaQuery } from '@fuse/hooks';
import { Button, Tab, Tabs, Typography } from '@mui/material';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import _ from 'lodash';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import reducer from '../store';
import ItemHeader from './ItemHeader';
import { getItem, newItem, selectItem, resetItem } from '../store/itemSlice';
import BasicInfoTab from './tabs/BasicInfoTab';
import ItemTab from './tabs/ItemTab';

/**
 * From Validation Schema
 */
const schema = yup.object().shape({
  item_name: yup
    .string()
    .required('You must enter a item name')
    .min(5, 'The item name must be at least 5 characters'),
  // machine_index: yup.object().shape({
  //   mch_code: yup
  //     .string()
  //     .required('You must enter a item name')
  //     .min(5, 'The item name must be at least 5 characters'),
  // }),
});

function Item(props) {
  const dispatch = useDispatch();
  const item = useSelector(selectItem);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [noItem, setNoItem] = useState(false);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState } = methods;
  const form = watch();

  useDeepCompareEffect(() => {
    function updateProductState() {
      const { itemID } = routeParams;

      if (itemID === 'new') {
        /**
         * Create New Product data
         */
        dispatch(newItem());
      } else {
        /**
         * Get Product data
         */
        dispatch(getItem(itemID)).then((action) => {
          /**
           * If the requested product is not exist show message
           */
          if (!action.payload) {
            setNoItem(true);
          }
        });
      }
    }

    updateProductState();
  }, [dispatch, routeParams]);

  useEffect(() => {
    if (!item) {
      return;
    }
    /**
     * Reset the form on item state changes
     */
    reset(item);
  }, [item, reset]);

  useEffect(() => {
    return () => {
      /**
       * Reset Item on component unload
       */
      dispatch(resetItem());
      setNoItem(false);
    };
  }, [dispatch]);

  /**
   * Tab Change
   */
  function handleTabChange(event, value) {
    setTabValue(value);
  }

  /**
   * Show Messgae if the requested items is not exist
   */
  if (noItem) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" varian="h5">
          There is no such item!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/apps/mn-preventive/items"
          color="inherit"
        >
          Go to Items Page
        </Button>
      </motion.div>
    );
  }
  /**
   * Wait while item data is loading and form is setted
   */
  if (
    _.isEmpty(form) ||
    (item && routeParams.itemID !== item.uuid && routeParams.itemID !== 'new')
  ) {
    return <FuseLoading />;
  }

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<ItemHeader />}
        content={
          <>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="scrollable"
              scrollButtons="auto"
              classes={{ root: 'w-full h-16 border-b-1' }}
            >
              <Tab className="h-64" label="Basic Info" />
              <Tab className="h-64" label="Item" />
            </Tabs>
            <div className="p-16 sm:p-24 max-w-3xl">
              <div className={tabValue !== 0 ? 'hidden' : ''}>
                <BasicInfoTab />
              </div>
              <div className={tabValue !== 1 ? 'hidden' : ''}>
                <ItemTab />
              </div>
            </div>
          </>
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
    </FormProvider>
  );
}

export default withReducer('mnPreventiveApp', reducer)(Item);
