import React, { useState } from 'react';
import moment from 'moment';
import { 
  Layout, Menu, Table, Button, Modal, Form, Input, Select, DatePicker, 
  Card, Statistic, Row, Col, Tabs, Space, Tag, Avatar, Badge, 
  Popconfirm, message, TimePicker, Switch
} from 'antd';
import { 
  CalendarOutlined, TeamOutlined, UserOutlined, SettingOutlined,
  PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined,
  ClockCircleOutlined, CheckCircleOutlined, ExclamationCircleOutlined,
  ScheduleOutlined, DashboardOutlined
} from '@ant-design/icons';
import './App.css';

const { Header, Content, Sider } = Layout;
const { TabPane } = Tabs;
const { Option } = Select;

// 模拟数据
const initialEmployees = [
  { id: 1, name: '张三', avatar: '张', role: '主治医师', department: '内科', phone: '13800138001', status: '在职', email: 'zhangsan@hospital.com' },
  { id: 2, name: '李四', avatar: '李', role: '护士长', department: '外科', phone: '13800138002', status: '在职', email: 'lisi@hospital.com' },
  { id: 3, name: '王五', avatar: '王', role: '医生', department: '儿科', phone: '13800138003', status: '休假', email: 'wangwu@hospital.com' },
  { id: 4, name: '赵六', avatar: '赵', role: '护士', department: '妇产科', phone: '13800138004', status: '在职', email: 'zhaoliu@hospital.com' },
  { id: 5, name: '钱七', avatar: '钱', role: '医生', department: '急诊科', phone: '13800138005', status: '在职', email: 'qianqi@hospital.com' },
  { id: 6, name: '孙八', avatar: '孙', role: '护士', department: 'ICU', phone: '13800138006', status: '在职', email: 'sunba@hospital.com' },
];

const initialShifts = [
  { id: 1, employeeId: 1, employeeName: '张三', date: '2026-03-29', shiftType: '早班', startTime: '08:00', endTime: '16:00', status: '已安排', notes: '' },
  { id: 2, employeeId: 2, employeeName: '李四', date: '2026-03-29', shiftType: '中班', startTime: '16:00', endTime: '24:00', status: '已安排', notes: '替班' },
  { id: 3, employeeId: 3, employeeName: '王五', date: '2026-03-29', shiftType: '晚班', startTime: '00:00', endTime: '08:00', status: '待确认', notes: '' },
  { id: 4, employeeId: 4, employeeName: '赵六', date: '2026-03-29', shiftType: '休息', startTime: '00:00', endTime: '00:00', status: '已安排', notes: '调休' },
  { id: 5, employeeId: 5, employeeName: '钱七', date: '2026-03-30', shiftType: '早班', startTime: '08:00', endTime: '16:00', status: '已安排', notes: '' },
  { id: 6, employeeId: 6, employeeName: '孙八', date: '2026-03-30', shiftType: '中班', startTime: '16:00', endTime: '24:00', status: '已安排', notes: '' },
];

const App: React.FC = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [shifts, setShifts] = useState(initialShifts);
  const [activeMenu, setActiveMenu] = useState('1');
  const [isShiftModalVisible, setIsShiftModalVisible] = useState(false);
  const [isEmployeeModalVisible, setIsEmployeeModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2026-03-29');
  const [searchText, setSearchText] = useState('');
  const [shiftForm] = Form.useForm();
  const [employeeForm] = Form.useForm();

  // 菜单点击处理
  const handleMenuClick = (key: string) => {
    setActiveMenu(key);
  };

  // 班次类型颜色
  const getShiftTypeColor = (type: string) => {
    switch (type) {
      case '早班': return 'green';
      case '中班': return 'orange';
      case '晚班': return 'purple';
      case '休息': return 'blue';
      default: return 'default';
    }
  };

  // 状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case '已安排': return 'success';
      case '待确认': return 'warning';
      case '已取消': return 'error';
      default: return 'default';
    }
  };

  // 新增排班
  const handleAddShift = () => {
    shiftForm.resetFields();
    setIsShiftModalVisible(true);
  };

  // 编辑排班
  const handleEditShift = (record: any) => {
    shiftForm.setFieldsValue({
      ...record,
      date: record.date ? moment(record.date) : null,
      timeRange: record.startTime && record.endTime ? 
        [moment(record.startTime, 'HH:mm'), moment(record.endTime, 'HH:mm')] : null
    });
    setIsShiftModalVisible(true);
  };

  // 删除排班
  const handleDeleteShift = (id: number) => {
    setShifts(shifts.filter(shift => shift.id !== id));
    message.success('排班已删除');
  };

  // 保存排班
  const handleShiftSave = () => {
    shiftForm.validateFields().then(values => {
      const newShift = {
        id: shifts.length + 1,
        employeeId: values.employeeId,
        employeeName: employees.find(e => e.id === values.employeeId)?.name || '',
        date: values.date.format('YYYY-MM-DD'),
        shiftType: values.shiftType,
        startTime: values.timeRange[0].format('HH:mm'),
        endTime: values.timeRange[1].format('HH:mm'),
        status: '已安排',
        notes: values.notes || '',
      };
      setShifts([...shifts, newShift]);
      setIsShiftModalVisible(false);
      message.success('排班已保存');
    });
  };

  // 新增员工
  const handleAddEmployee = () => {
    employeeForm.resetFields();
    setIsEmployeeModalVisible(true);
  };

  // 保存员工
  const handleEmployeeSave = () => {
    employeeForm.validateFields().then(values => {
      const newEmployee = {
        id: employees.length + 1,
        avatar: values.name.charAt(0),
        ...values,
        status: '在职'
      };
      setEmployees([...employees, newEmployee]);
      setIsEmployeeModalVisible(false);
      message.success('员工已添加');
    });
  };

  // 删除员工
  const handleDeleteEmployee = (id: number) => {
    setEmployees(employees.filter(emp => emp.id !== id));
    message.success('员工已删除');
  };

  // 筛选今日排班
  const todayShifts = shifts.filter(shift => shift.date === selectedDate);

  // 员工列定义
  const employeeColumns = [
    {
      title: '员工',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Space>
          <Avatar style={{ backgroundColor: '#1890ff' }}>{record.avatar}</Avatar>
          <div>
            <div style={{ fontWeight: 'bold' }}>{text}</div>
            <div style={{ fontSize: '12px', color: '#999' }}>{record.email}</div>
          </div>
        </Space>
      ),
    },
    { title: '职位', dataIndex: 'role', key: 'role' },
    { title: '部门', dataIndex: 'department', key: 'department' },
    { title: '电话', dataIndex: 'phone', key: 'phone' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === '在职' ? 'success' : 'warning'}>{status}</Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" icon={<EditOutlined />} size="small">编辑</Button>
          <Popconfirm
            title="确定删除该员工吗？"
            onConfirm={() => handleDeleteEmployee(record.id)}
          >
            <Button type="link" danger icon={<DeleteOutlined />} size="small">删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // 排班列定义
  const shiftColumns = [
    { title: '日期', dataIndex: 'date', key: 'date' },
    {
      title: '员工',
      dataIndex: 'employeeName',
      key: 'employeeName',
      render: (text: string, record: any) => (
        <Space>
          <Avatar size="small" style={{ backgroundColor: '#1890ff' }}>
            {employees.find(e => e.id === record.employeeId)?.avatar || text.charAt(0)}
          </Avatar>
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: '班次',
      dataIndex: 'shiftType',
      key: 'shiftType',
      render: (type: string) => (
        <Tag color={getShiftTypeColor(type)}>{type}</Tag>
      ),
    },
    {
      title: '时间',
      key: 'time',
      render: (_: any, record: any) => (
        <span>
          {record.startTime} - {record.endTime}
        </span>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      ),
    },
    { title: '备注', dataIndex: 'notes', key: 'notes', ellipsis: true },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" icon={<EditOutlined />} size="small" onClick={() => handleEditShift(record)}>
            编辑
          </Button>
          <Popconfirm
            title="确定删除这个排班吗？"
            onConfirm={() => handleDeleteShift(record.id)}
          >
            <Button type="link" danger icon={<DeleteOutlined />} size="small">删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // 渲染内容区域
  const renderContent = () => {
    
    switch (activeMenu) {
      case '1': // 排班管理
        return (
          <div className="content-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <h2 style={{ margin: 0 }}>排班管理</h2>
                <p style={{ color: '#666', marginTop: 8 }}>管理员工的工作排班计划</p>
              </div>
              <Space>
                <DatePicker 
                  value={moment(selectedDate)} 
                  onChange={(date) => setSelectedDate(date?.format('YYYY-MM-DD') || '')}
                  style={{ width: 200 }}
                />
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAddShift}>
                  新增排班
                </Button>
              </Space>
            </div>

            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
              <Col span={6}>
                <Card>
                  <Statistic 
                    title="今日排班数" 
                    value={todayShifts.length} 
                    prefix={<CalendarOutlined />}
                    valueStyle={{ color: '#1890ff' }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic 
                    title="早班人数" 
                    value={todayShifts.filter(s => s.shiftType === '早班').length} 
                    prefix={<ClockCircleOutlined />}
                    valueStyle={{ color: '#52c41a' }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic 
                    title="中班人数" 
                    value={todayShifts.filter(s => s.shiftType === '中班').length} 
                    prefix={<ScheduleOutlined />}
                    valueStyle={{ color: '#fa8c16' }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic 
                    title="待确认" 
                    value={todayShifts.filter(s => s.status === '待确认').length} 
                    prefix={<ExclamationCircleOutlined />}
                    valueStyle={{ color: '#faad14' }}
                  />
                </Card>
              </Col>
            </Row>

            <Card>
              <Tabs defaultActiveKey="1">
                <TabPane tab="今日排班" key="1">
                  <Table 
                    dataSource={todayShifts} 
                    columns={shiftColumns} 
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
                  />
                </TabPane>
                <TabPane tab="全部排班" key="2">
                  <Table 
                    dataSource={shifts} 
                    columns={shiftColumns} 
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                  />
                </TabPane>
              </Tabs>
            </Card>
          </div>
        );

      case '2': // 员工管理
        return (
          <div className="content-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <h2 style={{ margin: 0 }}>员工管理</h2>
                <p style={{ color: '#666', marginTop: 8 }}>管理医院员工信息</p>
              </div>
              <Space>
                <Input
                  placeholder="搜索员工..."
                  prefix={<SearchOutlined />}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ width: 200 }}
                />
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAddEmployee}>
                  新增员工
                </Button>
              </Space>
            </div>

            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
              <Col span={8}>
                <Card>
                  <Statistic 
                    title="员工总数" 
                    value={employees.length} 
                    prefix={<TeamOutlined />}
                    valueStyle={{ color: '#1890ff' }}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic 
                    title="在职员工" 
                    value={employees.filter(e => e.status === '在职').length} 
                    prefix={<CheckCircleOutlined />}
                    valueStyle={{ color: '#52c41a' }}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic 
                    title="医生人数" 
                    value={employees.filter(e => e.role.includes('医生')).length} 
                    prefix={<UserOutlined />}
                    valueStyle={{ color: '#722ed1' }}
                  />
                </Card>
              </Col>
            </Row>

            <Card>
              <Table 
                dataSource={employees.filter(emp => 
                  emp.name.includes(searchText) || 
                  emp.department.includes(searchText) ||
                  emp.role.includes(searchText)
                )} 
                columns={employeeColumns} 
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            </Card>
          </div>
        );

      case '3': // 个人中心
        return (
          <div className="content-container">
            <h2 style={{ marginBottom: 24 }}>个人中心</h2>
            <Row gutter={[24, 24]}>
              <Col span={8}>
                <Card>
                  <div style={{ textAlign: 'center' }}>
                    <Avatar size={80} style={{ backgroundColor: '#1890ff', fontSize: 32 }}>管</Avatar>
                    <h3 style={{ marginTop: 16, marginBottom: 4 }}>管理员</h3>
                    <p style={{ color: '#666', marginBottom: 16 }}>系统管理员</p>
                    <Button type="primary">编辑资料</Button>
                  </div>
                </Card>
              </Col>
              <Col span={16}>
                <Card title="我的排班">
                  <Table 
                    dataSource={shifts.filter(s => s.employeeId <= 2)} 
                    columns={shiftColumns.filter(col => ['date', 'shiftType', 'status', 'notes'].includes(col.key as string))}
                    rowKey="id"
                    pagination={false}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        );

      case '4': // 系统设置
        return (
          <div className="content-container">
            <h2 style={{ marginBottom: 24 }}>系统设置</h2>
            <Row gutter={[24, 24]}>
              <Col span={12}>
                <Card title="基本设置">
                  <Form layout="vertical">
                    <Form.Item label="医院名称">
                      <Input placeholder="请输入医院名称" />
                    </Form.Item>
                    <Form.Item label="默认班次时间">
                      <Space>
                        <TimePicker placeholder="开始时间" />
                        <span>至</span>
                        <TimePicker placeholder="结束时间" />
                      </Space>
                    </Form.Item>
                    <Form.Item label="自动排班">
                      <Switch checkedChildren="开启" unCheckedChildren="关闭" />
                    </Form.Item>
                    <Button type="primary">保存设置</Button>
                  </Form>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="通知设置">
                  <Form layout="vertical">
                    <Form.Item label="排班变动通知">
                      <Switch defaultChecked />
                    </Form.Item>
                    <Form.Item label="员工入职通知">
                      <Switch defaultChecked />
                    </Form.Item>
                    <Form.Item label="排班冲突提醒">
                      <Switch defaultChecked />
                    </Form.Item>
                    <Form.Item label="提前提醒时间">
                      <Select defaultValue="1">
                        <Option value="1">1小时前</Option>
                        <Option value="2">2小时前</Option>
                        <Option value="3">3小时前</Option>
                        <Option value="24">1天前</Option>
                      </Select>
                    </Form.Item>
                  </Form>
                </Card>
              </Col>
            </Row>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        width={220} 
        style={{ 
          background: 'linear-gradient(180deg, #1890ff 0%, #096dd9 100%)',
          boxShadow: '2px 0 8px rgba(0,0,0,0.1)'
        }}
      >
        <div className="logo" style={{ padding: '24px 16px', textAlign: 'center' }}>
          <div style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 4 }}>
            <CalendarOutlined style={{ marginRight: 8 }} />
            排班助手
          </div>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>智能医院排班系统</div>
        </div>
        
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeMenu]}
          onClick={({ key }) => handleMenuClick(key)}
          style={{ 
            background: 'transparent',
            borderRight: 'none'
          }}
        >
          <Menu.Item key="1" icon={<DashboardOutlined />} style={{ margin: '8px 12px', borderRadius: 8 }}>
            排班管理
          </Menu.Item>
          <Menu.Item key="2" icon={<TeamOutlined />} style={{ margin: '8px 12px', borderRadius: 8 }}>
            员工管理
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />} style={{ margin: '8px 12px', borderRadius: 8 }}>
            个人中心
          </Menu.Item>
          <Menu.Item key="4" icon={<SettingOutlined />} style={{ margin: '8px 12px', borderRadius: 8 }}>
            系统设置
          </Menu.Item>
        </Menu>
      </Sider>
      
      <Layout>
        <Header style={{ 
          background: '#fff', 
          padding: '0 24px', 
          boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 'bold' }}>
              {activeMenu === '1' ? '排班管理' : 
               activeMenu === '2' ? '员工管理' : 
               activeMenu === '3' ? '个人中心' : '系统设置'}
            </h2>
          </div>
          <Space>
            <Badge count={3}>
              <Button type="text" icon={<ExclamationCircleOutlined />}>通知</Button>
            </Badge>
            <Avatar icon={<UserOutlined />} />
          </Space>
        </Header>
        
        <Content style={{ margin: '24px', overflow: 'initial' }}>
          {renderContent()}
        </Content>
      </Layout>

      {/* 排班模态框 */}
      <Modal
        title="排班信息"
        open={isShiftModalVisible}
        onOk={handleShiftSave}
        onCancel={() => setIsShiftModalVisible(false)}
        width={600}
      >
        <Form form={shiftForm} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="employeeId"
                label="员工"
                rules={[{ required: true, message: '请选择员工' }]}
              >
                <Select placeholder="请选择员工" showSearch optionFilterProp="children">
                  {employees.map(emp => (
                    <Option key={emp.id} value={emp.id}>
                      {emp.name} - {emp.role}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="date"
                label="日期"
                rules={[{ required: true, message: '请选择日期' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="shiftType"
                label="班次类型"
                rules={[{ required: true, message: '请选择班次类型' }]}
              >
                <Select placeholder="请选择班次类型">
                  <Option value="早班">早班 (08:00-16:00)</Option>
                  <Option value="中班">中班 (16:00-24:00)</Option>
                  <Option value="晚班">晚班 (00:00-08:00)</Option>
                  <Option value="休息">休息</Option>
                  <Option value="自定义">自定义</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="timeRange"
                label="工作时间"
                rules={[{ required: true, message: '请选择工作时间' }]}
              >
                <TimePicker.RangePicker style={{ width: '100%' }} format="HH:mm" />
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item name="notes" label="备注">
            <Input.TextArea placeholder="请输入备注信息" rows={3} />
          </Form.Item>
        </Form>
      </Modal>

      {/* 员工模态框 */}
      <Modal
        title="员工信息"
        open={isEmployeeModalVisible}
        onOk={handleEmployeeSave}
        onCancel={() => setIsEmployeeModalVisible(false)}
        width={600}
      >
        <Form form={employeeForm} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="姓名"
                rules={[{ required: true, message: '请输入姓名' }]}
              >
                <Input placeholder="请输入姓名" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="role"
                label="职位"
                rules={[{ required: true, message: '请选择职位' }]}
              >
                <Select placeholder="请选择职位">
                  <Option value="医生">医生</Option>
                  <Option value="护士">护士</Option>
                  <Option value="主治医师">主治医师</Option>
                  <Option value="护士长">护士长</Option>
                  <Option value="主任医师">主任医师</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="department"
                label="部门"
                rules={[{ required: true, message: '请选择部门' }]}
            >
                <Select placeholder="请选择部门">
                  <Option value="内科">内科</Option>
                  <Option value="外科">外科</Option>
                  <Option value="儿科">儿科</Option>
                  <Option value="妇产科">妇产科</Option>
                  <Option value="急诊科">急诊科</Option>
                  <Option value="ICU">ICU</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="电话"
                rules={[{ required: true, message: '请输入电话' }]}
              >
                <Input placeholder="请输入电话" />
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item
            name="email"
            label="邮箱"
            rules={[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入有效的邮箱地址' }]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default App;