import React, { useState } from 'react';
import { Layout, Menu, Table, Button, Modal, Form, Input, Select, DatePicker, Card, Statistic, Row, Col } from 'antd';
import { UserOutlined, CalendarOutlined, TeamOutlined, SettingOutlined } from '@ant-design/icons';
import './App.css';

const { Header, Content, Sider } = Layout;
const { Option } = Select;

interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  phone: string;
}

interface Shift {
  id: number;
  employeeId: number;
  employeeName: string;
  date: string;
  shiftType: '早班' | '中班' | '晚班' | '休息';
  notes: string;
}

const App: React.FC = () => {
  const [employees] = useState<Employee[]>([
    { id: 1, name: '张三', role: '医生', department: '内科', phone: '13800138001' },
    { id: 2, name: '李四', role: '护士', department: '外科', phone: '13800138002' },
    { id: 3, name: '王五', role: '医生', department: '儿科', phone: '13800138003' },
    { id: 4, name: '赵六', role: '护士', department: '妇产科', phone: '13800138004' },
  ]);

  const [shifts, setShifts] = useState<Shift[]>([
    { id: 1, employeeId: 1, employeeName: '张三', date: '2026-03-29', shiftType: '早班', notes: '' },
    { id: 2, employeeId: 2, employeeName: '李四', date: '2026-03-29', shiftType: '中班', notes: '替班' },
    { id: 3, employeeId: 3, employeeName: '王五', date: '2026-03-29', shiftType: '晚班', notes: '' },
    { id: 4, employeeId: 4, employeeName: '赵六', date: '2026-03-29', shiftType: '休息', notes: '调休' },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const employeeColumns = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '职位', dataIndex: 'role', key: 'role' },
    { title: '部门', dataIndex: 'department', key: 'department' },
    { title: '电话', dataIndex: 'phone', key: 'phone' },
  ];

  const shiftColumns = [
    { title: '日期', dataIndex: 'date', key: 'date' },
    { title: '员工', dataIndex: 'employeeName', key: 'employeeName' },
    { title: '班次', dataIndex: 'shiftType', key: 'shiftType' },
    { title: '备注', dataIndex: 'notes', key: 'notes' },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Shift) => (
        <Button size="small" onClick={() => handleEditShift(record)}>
          编辑
        </Button>
      ),
    },
  ];

  const handleAddShift = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditShift = (record: Shift) => {
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      const newShift = {
        id: shifts.length + 1,
        ...values,
        employeeName: employees.find(e => e.id === values.employeeId)?.name || '',
      };
      setShifts([...shifts, newShift]);
      setIsModalVisible(false);
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div className="logo" style={{ color: 'white', textAlign: 'center', padding: '16px', fontSize: '18px' }}>
          <CalendarOutlined /> 排班助手
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<CalendarOutlined />}>排班管理</Menu.Item>
          <Menu.Item key="2" icon={<TeamOutlined />}>员工管理</Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>个人中心</Menu.Item>
          <Menu.Item key="4" icon={<SettingOutlined />}>系统设置</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px' }}>
          <h2>员工排班管理系统</h2>
        </Header>
        <Content style={{ margin: '24px' }}>
          <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
            <Col span={6}>
              <Card>
                <Statistic title="总员工数" value={employees.length} />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic title="今日排班" value={shifts.filter(s => s.date === '2026-03-29').length} />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic title="早班人数" value={shifts.filter(s => s.shiftType === '早班').length} />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic title="休息人数" value={shifts.filter(s => s.shiftType === '休息').length} />
              </Card>
            </Col>
          </Row>

          <Card title="排班表" style={{ marginBottom: '24px' }}>
            <Button type="primary" onClick={handleAddShift} style={{ marginBottom: '16px' }}>
              新增排班
            </Button>
            <Table dataSource={shifts} columns={shiftColumns} rowKey="id" pagination={false} />
          </Card>

          <Card title="员工列表">
            <Table dataSource={employees} columns={employeeColumns} rowKey="id" pagination={false} />
          </Card>
        </Content>
      </Layout>

      <Modal
        title="排班信息"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="employeeId"
            label="员工"
            rules={[{ required: true, message: '请选择员工' }]}
          >
            <Select placeholder="请选择员工">
              {employees.map(emp => (
                <Option key={emp.id} value={emp.id}>
                  {emp.name} - {emp.role}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="date"
            label="日期"
            rules={[{ required: true, message: '请选择日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="shiftType"
            label="班次"
            rules={[{ required: true, message: '请选择班次' }]}
          >
            <Select placeholder="请选择班次">
              <Option value="早班">早班 (08:00-16:00)</Option>
              <Option value="中班">中班 (16:00-24:00)</Option>
              <Option value="晚班">晚班 (00:00-08:00)</Option>
              <Option value="休息">休息</Option>
            </Select>
          </Form.Item>
          <Form.Item name="notes" label="备注">
            <Input.TextArea placeholder="请输入备注信息" />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default App;