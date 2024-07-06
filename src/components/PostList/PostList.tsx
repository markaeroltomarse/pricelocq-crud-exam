import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    IconButton,
    Skeleton,
    Snackbar,
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
    Typography
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { TPost } from 'src/types';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: 200, // Adjust as needed
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));




interface IPostListProps {
    posts?: TPost[]
    totalPostsCount?: number
    deleteMultipleIsLoading?: boolean
    selectedPosts?: number[]
    loadingSkeleton?: boolean
    onClickView?: (post: TPost) => void
    onClickEdit?: (post: TPost) => void
    onClickDelete?: (post: TPost) => void
    onDeleteMultiple?: (postIds: number[]) => void
    onChangeSelectedPosts?: (postIds: number[]) => void
    onChangeSelectAll?: (checked: boolean) => void
}

const PostList: React.FC<IPostListProps> = (props) => {
    const {
        posts,
        totalPostsCount,
        deleteMultipleIsLoading,
        selectedPosts,
        loadingSkeleton,
        onDeleteMultiple,
        onClickView,
        onClickEdit,
        onClickDelete,
        onChangeSelectedPosts,
        onChangeSelectAll
    } = props

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOnChangeSelect = (postId: number, isChecked: boolean) => {
        if (selectedPosts) {
            onChangeSelectedPosts?.(isChecked ? [...selectedPosts, postId] : selectedPosts.filter(id => id !== postId))
        }
    };

    const postsData = useMemo(() => {
        if (!posts) return []

        const startIndex = page * rowsPerPage
        const endIndex = startIndex + rowsPerPage
        const data = posts.slice(startIndex, endIndex)
        return data
    }, [page, rowsPerPage, posts])

    const renderTableSkeleton = useMemo(() => {
        if (loadingSkeleton) {
            return [3, 5, 6, 7, 8, 9, 10].map((id, i) => <>
                <StyledTableRow key={String(id) + i} color='red' hover={true} >
                    <StyledTableCell >
                        <Skeleton variant="rectangular" width={'100%'} height={'50px'} />
                    </StyledTableCell>
                    <StyledTableCell>
                        <Skeleton variant="rectangular" width={'100%'} height={'50px'} />
                    </StyledTableCell>
                    <StyledTableCell >
                        <Skeleton variant="rectangular" width={'100%'} height={'50px'} />
                    </StyledTableCell>
                    <StyledTableCell >
                        <Skeleton variant="rectangular" width={'100%'} height={'50px'} />
                    </StyledTableCell>
                    <StyledTableCell>
                        <Skeleton variant="rectangular" width={'100%'} height={'50px'} />
                    </StyledTableCell>
                    <StyledTableCell  >
                        <Skeleton variant="rectangular" width={'100%'} height={'50px'} />
                    </StyledTableCell>
                </StyledTableRow>
            </>)
        }
    }, [loadingSkeleton])

    const renderPostRow = useMemo(() => {
        return postsData.map((row, i) => (
            <StyledTableRow key={row.id + String(i)} color='#000000' hover={true}  >
                <StyledTableCell width={'1%'}>
                    <Checkbox
                        key={row.id}
                        checked={selectedPosts && selectedPosts.includes(row.id!)}
                        color='info'
                        onChange={(e) => handleOnChangeSelect(row.id!, e.target.checked)}
                    />
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                    {row.id}
                </StyledTableCell>
                <StyledTableCell>{row.userId}</StyledTableCell>
                <StyledTableCell>
                    <Tooltip title={row.title}>
                        <Typography variant='subtitle2'>{row.title}</Typography>
                    </Tooltip>
                </StyledTableCell>
                <StyledTableCell>
                    <Tooltip title={row.body}>
                        <Typography variant='subtitle2'>{row.body}</Typography>
                    </Tooltip>
                </StyledTableCell>
                <StyledTableCell width={'5%'} align='center' style={{ borderLeft: '1px solid #dfe6e9' }}>
                    <Tooltip title="View">
                        <IconButton onClick={() => onClickView?.(row)}>
                            <VisibilityIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                        <IconButton onClick={() => onClickEdit?.(row)}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton onClick={() => onClickDelete?.(row)}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </StyledTableCell>
            </StyledTableRow>
        ))
    }, [postsData, selectedPosts])

    return (
        <Box>
            <Snackbar
                open={selectedPosts && selectedPosts.length > 0}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                action={<>
                    <Button disabled={deleteMultipleIsLoading} onClick={() => onDeleteMultiple?.(selectedPosts || [])}>
                        Delete ({selectedPosts?.length}) {deleteMultipleIsLoading && <CircularProgress color='inherit' size={14} />}
                    </Button>
                </>}
            />
            <TableContainer style={{ borderRadius: '5px' }}>
                <Table sx={{ minWidth: 700 }} size='medium'>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell style={{ fontWeight: 'bold' }}>
                                <Tooltip title="Select All">
                                    <Checkbox color='warning' onChange={(e) => onChangeSelectAll?.(e.target.checked)} />
                                </Tooltip>
                            </StyledTableCell>
                            <StyledTableCell style={{ fontWeight: 'bold' }}>ID</StyledTableCell>
                            <StyledTableCell style={{ fontWeight: 'bold' }}>User ID</StyledTableCell>
                            <StyledTableCell style={{ fontWeight: 'bold' }}>Title</StyledTableCell>
                            <StyledTableCell style={{ fontWeight: 'bold' }}>Body</StyledTableCell>
                            <StyledTableCell align='center' style={{ borderLeft: '1px solid #faecc5', fontWeight: 'bold' }}>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderPostRow}
                        {renderTableSkeleton}
                    </TableBody>
                </Table>
            </TableContainer>
            <br />
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={totalPostsCount || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
};

export default PostList;
