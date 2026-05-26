import { useState } from 'react';
import { m } from '@/paraglide/messages';
import { useAuthStore } from '@/presentation/stores/useAuthStore';
import {
  Button,
  Space,
  DatePicker,
  Card,
  App,
  Rate,
  Divider,
  Tag,
  Typography,
  QRCode,
  Flex,
  Switch,
} from 'antd';
import {
  RocketOutlined,
  SmileOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

export default function DashboardPage() {
  const user = useAuthStore(state => state.user);
  const welcomeSuffix = user?.firstName ? `, ${user.firstName}.` : '.';
  const { message, modal, notification } = App.useApp();
  const [rateVal, setRateVal] = useState(5);
  const [showQR, setShowQR] = useState(false);

  const showSuccessMessage = () => {
    message.success('Ant Design đã được tích hợp thành công vào dự án!');
  };

  const showNotification = () => {
    notification.info({
      message: 'Thông báo hệ thống',
      description: 'Đây là thông báo mẫu sử dụng Ant Design Notification API!',
      placement: 'topRight',
    });
  };

  const showConfirmModal = () => {
    modal.confirm({
      title: 'Xác nhận tích hợp',
      icon: <SmileOutlined style={{ color: '#1677ff' }} />,
      content: 'Bạn có đồng ý rằng Ant Design v5 rất mượt mà và trực quan?',
      okText: 'Hoàn toàn đồng ý',
      cancelText: 'Hủy',
      onOk() {
        message.success('Cảm ơn bạn đã phản hồi!');
      },
    });
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-slate-950 px-8 py-10 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">
            {m.dashboard_overview()}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            {m.dashboard_welcome({ suffix: welcomeSuffix })}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            {m.dashboard_description()}
          </p>
        </div>

        <div className="grid gap-4 px-8 py-8 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">
              {m.dashboard_signed_in_as()}
            </p>
            <p className="mt-2 text-base font-semibold text-slate-900">
              {user?.email || m.dashboard_no_email()}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">
              {m.dashboard_status()}
            </p>
            <p className="mt-2 text-base font-semibold text-emerald-600">
              {m.dashboard_authenticated()}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">
              {m.dashboard_role_label()}
            </p>
            <p className="mt-2 text-base font-semibold text-slate-900">
              {user?.role?.name || m.profile_empty_value()}
            </p>
          </div>
        </div>
      </section>

      {/* Ant Design Showcase Section */}
      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <RocketOutlined className="text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Ant Design v5 Playground
            </h2>
            <p className="text-sm text-slate-500">
              Khu vực thử nghiệm các Component và API của Ant Design sau khi
              tích hợp thành công
            </p>
          </div>
        </div>

        <Divider />

        <div className="grid gap-6 md:grid-cols-2">
          {/* Card 1: Feedback & Interactive APIs */}
          <Card
            title={
              <span className="flex items-center gap-2">
                <ThunderboltOutlined className="text-amber-500" />
                <span>Hộp thoại & Thông báo (Feedback APIs)</span>
              </span>
            }
            bordered={false}
            className="bg-slate-50 hover:shadow-md transition-all duration-300 rounded-2xl"
          >
            <div className="flex flex-col gap-4">
              <p className="text-sm text-slate-600">
                Sử dụng các Context API được thiết lập toàn cục thông qua{' '}
                <code>&lt;App&gt;</code> để kích hoạt thông báo mà không bị gián
                đoạn Render:
              </p>
              <Space wrap size="middle">
                <Button
                  type="primary"
                  onClick={showSuccessMessage}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Show Message
                </Button>
                <Button onClick={showNotification}>Show Notification</Button>
                <Button danger onClick={showConfirmModal}>
                  Open Confirm Modal
                </Button>
              </Space>
            </div>
          </Card>

          {/* Card 2: Interactive components */}
          <Card
            title={
              <span className="flex items-center gap-2">
                <SmileOutlined className="text-emerald-500" />
                <span>Components trực quan & Tiện ích</span>
              </span>
            }
            bordered={false}
            className="bg-slate-50 hover:shadow-md transition-all duration-300 rounded-2xl"
          >
            <div className="flex flex-col gap-4">
              {/* Datepicker & Tag */}
              <Flex gap="middle" align="center" justify="space-between" wrap>
                <Text strong>Chọn ngày thử nghiệm:</Text>
                <DatePicker className="w-48" placeholder="Chọn ngày" />
              </Flex>

              {/* Rate & Dynamic text */}
              <Flex gap="middle" align="center" justify="space-between" wrap>
                <Text strong>Đánh giá mức độ hài lòng:</Text>
                <div className="flex items-center gap-2">
                  <Rate value={rateVal} onChange={setRateVal} />
                  <Tag
                    color={
                      rateVal >= 4
                        ? 'success'
                        : rateVal >= 2
                          ? 'warning'
                          : 'error'
                    }
                  >
                    {rateVal} sao
                  </Tag>
                </div>
              </Flex>

              {/* QR Code toggle */}
              <Flex gap="middle" align="center" justify="space-between">
                <Text strong>Hiển thị mã QR ứng dụng:</Text>
                <Switch checked={showQR} onChange={setShowQR} />
              </Flex>

              {showQR && (
                <div className="flex justify-center py-2 animate-fade-in">
                  <QRCode
                    value="https://ant.design"
                    size={120}
                    status="active"
                  />
                </div>
              )}
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
