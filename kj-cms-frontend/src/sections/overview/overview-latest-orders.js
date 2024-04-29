import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';
import { ImageBaseUrl } from 'src/config/api';

const statusMap = {
  pending: 'warning',
  delivered: 'success',
  refunded: 'error'
};

export const OverviewLatestOrders = (props) => {
  const { commitees, sx } = props;
  console.log(commitees, "commitesss")


  return (
    <Card sx={sx}>
      <CardHeader title="Commitees Registered" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800, padding: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sr No.</TableCell>
                <TableCell>Logo</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Head Email</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {commitees?.map((d, i) => {
                // const createdAt = format(d?.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={d?._id}
                  >
                    <TableCell>{i + 1}</TableCell><TableCell>
                      <img src={ImageBaseUrl + d?.image}
                        style={{ maxWidth: 50, maxHeight: 50 }}
                        alt="logo"
                      />
                    </TableCell>
                    <TableCell>{d?.name}</TableCell>
                    <TableCell>{d?.dept}</TableCell>
                    <TableCell>{d?.email}</TableCell>
                    <TableCell>{d?.description}</TableCell>

                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card >
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
