import React, { useEffect, useState } from "react";
import {
  Empty,
  Flex,
  Skeleton,
  Table,
  TableColumnsType,
  TablePaginationConfig,
} from "antd";
import "./styles.css";

type TableProps = {
  onSelectChange?: (newSelectedRowKeys: any) => void;
  pagination?: false | TablePaginationConfig | undefined;
  columns: TableColumnsType<any>;
  data: Array<object>;
  className?: string; // for tailwindcss
  onRowClick?: (record: any) => void;
  reload?: boolean;
  loadingTable?: boolean;
};

export const BaseTable = (props: TableProps) => {
  const {
    className,
    data,
    columns,
    onSelectChange,
    pagination,
    onRowClick,
    reload,
    loadingTable,
  } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const _onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
    onSelectChange && onSelectChange(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: _onSelectChange,
  };

  const handleClickRow = (record: any) => {
    onRowClick && onRowClick(record);
  };

  useEffect(() => {
    setSelectedRowKeys([]);
  }, [reload]);
  return (
    <>
      <Table
        className={className}
        bordered
        rowSelection={onSelectChange && rowSelection}
        pagination={pagination || false}
        columns={columns}
        dataSource={data}
        onRow={(record) => ({
          onDoubleClick: () => handleClickRow(record),
        })}
        scroll={{ x: "max-content" }}
        loading={loadingTable}
        locale={{
          emptyText: loadingTable ? (
            <Flex vertical gap={20}>
              {[...Array(data?.length || 0)].map((_, rowIndex) => (
                <Flex gap={10} justify="space-between" key={rowIndex}>
                  {columns.map((column) => (
                    <Skeleton.Input
                      key={`${column.title}-${rowIndex}`}
                      active={true}
                      size="small"
                      style={{ width: "90%" }}
                    />
                  ))}
                </Flex>
              ))}
            </Flex>
          ) : (
            <> </>
          ),
        }}
      />
    </>
  );
};
