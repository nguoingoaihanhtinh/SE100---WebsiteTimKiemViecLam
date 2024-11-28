import { FaPaperPlane } from "react-icons/fa6";

const tmpText = `<h3><strong>Mô tả công việc</strong></h3><p>- Tìm kiếm, khai thác khách hàng tiềm năng từ ngành xe ô tô tải</p><p>- Lên kế hoạch thực hiện các chỉ tiêu kinh doanh được giao</p><p>- Giới thiệu tư vấn, hướng dẫn, giải đáp thắc mắc của khách hàng về các dòng xe tải Isuzu, Hyundai, Hino, ....</p><p>- Quản lý, theo dõi hợp đồng.</p><p>- Chăm sóc khách hàng trước, trong và sau ký hợp đồng.</p><p>- Tham gia nghiên cứu thị trường, nhanh chóng nắm bắt nhu cầu của khách hàng mua xe.</p><p>- Trau dồi kỹ năng tư vấn, giới thiệu sản phẩm, quảng bá hình ảnh công ty đến khách hàng một cách chuyên nghiệp.</p><h3><strong>Yêu cầu ứng viên</strong></h3><p>- Độ tuổi/giới tính: Nam, 20 tuổi trở lên</p><p>- Không yêu cầu kinh nghiệm</p><p>- Sử dụng thành thạo vi tính văn phòng</p><p>- Tốt nghiệp Trung cấp/ Cao đẳng trở lên</p><p>- Trung thực, nhiệt tình và quyết liệt trong công việc, bảo mật thông tin</p><p>- Có tinh thần cầu tiến, đam mê với công việc kinh doanh.</p><h3><strong>Quyền lợi</strong></h3><p>- Lương thưởng tùy năng lực: Lương cứng + Hoa hồng bán xe + Hoa hồng bảo hiểm + Hoa hồng ngân hàng, thực lĩnh lên tới 30tr/ tháng</p><p>- Phụ cấp cơm trưa, đồng phục.</p><p>- Tham gia BHXH theo quy định của bộ luật hiện hành</p><p>- Có xe ô tô của công ty nếu cần đi ký hợp đồng.</p><p>- Thường xuyên tham gia chương trình đào tạo của công ty để nâng cao chuyên môn</p><p>- Hưởng đầy đủ các chế độ phúc lợi theo quy định (BHXH, HĐLĐ..)</p><p>- Chế độ thưởng tháng 13</p><p>- Sinh viên mới ra trường sẽ được đào tạo kinh nghiệm</p><p>- Chi tiết trao đổi khi phỏng vấn.</p><h3><strong>Địa điểm làm việc</strong></h3><p>- Bình Dương: 68 Đại Lộ Bình Dương, Khu phố Bình Giao, Phường Thuận Giao (Đối diện Aeon Mall Bình Dương), Thuận An</p><p>- Hồ Chí Minh: 466 QL1A, Quận 12</p><h3>Cách thức ứng tuyển</h3><p>Ứng viên nộp hồ sơ trực tuyến bằng cách bấm&nbsp;<strong>Ứng tuyển</strong>&nbsp;ngay dưới đây.</p><p>Hạn nộp hồ sơ: 31/12/2024</p>`;
export default function JobDescription() {
  return (
    <div className="bg-white px-[24px] py-[16px] rounded-[12px] w-full mt-8">
      <p className="text-[22px] font-bold">Chi tiết tin tuyển dụng</p>

      <div className="mt-4 text-[16px]" dangerouslySetInnerHTML={{ __html: tmpText }} />

      <div className="mt-4">
        <div className="px-4 py-2 bg-black rounded-[4px] inline-flex text-white items-center gap-4 cursor-pointer hover:opacity-90 transition-all">
          <FaPaperPlane className="text-white" />
          <p className="text-white font-medium">Ứng tuyển ngay</p>
        </div>
      </div>
    </div>
  );
}
