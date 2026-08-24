export function numberToWords(num: number | string): string {
  const n = Number(num);
  if (isNaN(n) || n === 0) return '';
  
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
  const numToWords = (n: number, suffix: string): string => {
    let str = '';
    if (n > 19) {
      str += b[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + a[n % 10] : ' ');
    } else {
      str += a[n];
    }
    return str !== '' ? str + suffix : '';
  };
  
  let res = '';
  res += numToWords(Math.floor(n / 10000000), 'Crore ');
  res += numToWords(Math.floor((n / 100000) % 100), 'Lakh ');
  res += numToWords(Math.floor((n / 1000) % 100), 'Thousand ');
  res += numToWords(Math.floor((n / 100) % 10), 'Hundred ');
  
  if (n > 100 && n % 100 !== 0) {
    res += 'and ';
  }
  res += numToWords(Math.floor(n % 100), '');
  
  return res.trim() + ' Only';
}
