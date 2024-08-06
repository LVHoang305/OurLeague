function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
const sogiaidau = numberWithCommas(35970)
const sodoibong = numberWithCommas(183233)
const socauthu = numberWithCommas(847224)
const sotrandau = numberWithCommas(1229018)

export const text = {
    title: 'Hệ thống quản lý giải đấu chuyên nghiệp',
    description: 'OurLeague là Hệ thống quản lý giải đấu chuyên nghiệp, giúp các Ban tổ chức giải quản lý giải đấu một cách dễ dàng, hạn chế tối đa những sai sót khi thống kê, quản lý cầu thủ…',
    statistic: [
        {name:'Giải đấu',value: sogiaidau},
        {name:'Đội thi đấu',value: sodoibong},
        {name:'Cầu thủ',value: socauthu},
        {name:'Trận đấu',value: sotrandau},
    ]
}