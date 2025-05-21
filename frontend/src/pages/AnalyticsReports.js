import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import axios from 'axios';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Objet de traductions
const translations = {
  analyticsReportsTitle: {
    fr: "Analytique & Rapports (Graphiques de taille fixe)",
    en: "Analytics & Reports (Fixed Size Charts)",
    ar: "التحليلات والتقارير (مخططات بحجم ثابت)"
  },
  customers: {
    fr: "Clients",
    en: "Customers",
    ar: "العملاء"
  },
  totalCars: {
    fr: "Total des voitures",
    en: "Total Cars",
    ar: "إجمالي السيارات"
  },
  availableCars: {
    fr: "Voitures disponibles",
    en: "Available Cars",
    ar: "السيارات المتوفرة"
  },
  unavailableCars: {
    fr: "Voitures indisponibles",
    en: "Unavailable Cars",
    ar: "السيارات غير المتوفرة"
  },
  orders: {
    fr: "Commandes",
    en: "Orders",
    ar: "الطلبات"
  },
  revenue: {
    fr: "Revenu (DH)",
    en: "Revenue (DH)",
    ar: "الإيرادات (د.م)"
  },
  salesCosts: {
    fr: "Ventes & Coûts",
    en: "Sales & Costs",
    ar: "المبيعات والتكاليف"
  },
  totalOrders: {
    fr: "Total des commandes",
    en: "Total Orders",
    ar: "إجمالي الطلبات"
  },
  totalProfit: {
    fr: "Profit total",
    en: "Total Profit",
    ar: "إجمالي الربح"
  },
  topLocations: {
    fr: "Meilleures localisations",
    en: "Top Locations",
    ar: "أفضل المواقع"
  },
  bookingsByUser: {
    fr: "Réservations par utilisateur (top 5)",
    en: "Bookings by User (top 5)",
    ar: "الحجوزات حسب المستخدم (أفضل 5)"
  },
  bookingsByCar: {
    fr: "Réservations par voiture (top 5)",
    en: "Bookings by Car (top 5)",
    ar: "الحجوزات حسب السيارة (أفضل 5)"
  },
  lastTransactions: {
    fr: "Dernières transactions",
    en: "Last Transactions",
    ar: "أحدث المعاملات"
  },
  loading: {
    fr: "Chargement...",
    en: "Loading...",
    ar: "جاري التحميل..."
  },
  // Traductions pour la Navbar
  welcome: {
    fr: "Bienvenue!",
    en: "Welcome!",
    ar: "مرحبا!"
  },
  dashboardOverview: {
    fr: "Vue d'ensemble du tableau de bord",
    en: "Dashboard overview",
    ar: "نظرة عامة على لوحة القيادة"
  },
  carManagement: {
    fr: "Gestion des voitures",
    en: "Car management",
    ar: "إدارة السيارات"
  },
  userManagement: {
    fr: "Gestion des utilisateurs",
    en: "User Management",
    ar: "إدارة المستخدمين"
  },
  bookingManagement: {
    fr: "Gestion des réservations",
    en: "Booking Management",
    ar: "إدارة الحجوزات"
  },
  analyticsReports: {
    fr: "Analytique & Rapports",
    en: "Analytics and Reports",
    ar: "التحليلات والتقارير"
  },
  locationContact: {
    fr: "Localisation & Contact",
    en: "Location & Contact",
    ar: "الموقع والاتصال"
  },
  settingsPreferences: {
    fr: "Paramètres et Préférences",
    en: "Settings and Preferences",
    ar: "الإعدادات والتفضيلات"
  },
  feedbackReviews: {
    fr: "Retour d'information et Avis",
    en: "Feedback and Reviews",
    ar: "الملاحظات والمراجعات"
  },
  logout: {
    fr: "Se déconnecter",
    en: "Logout",
    ar: "تسجيل الخروج"
  },
  totalRevenue: {
    fr: "Revenu total",
    en: "Total Revenue",
    ar: "إجمالي الإيرادات"
  },
  totalBookings: {
    fr: "Réservations totales",
    en: "Total Bookings",
    ar: "إجمالي الحجوزات"
  },
  activeUsers: {
    fr: "Utilisateurs actifs",
    en: "Active Users",
    ar: "المستخدمين النشطين"
  },
  totalCars: {
    fr: "Voitures totales",
    en: "Total Cars",
    ar: "إجمالي السيارات"
  },
  rentedCars: {
    fr: "Voitures louées",
    en: "Rented Cars",
    ar: "السيارات المؤجرة"
  },
  averageBookingValue: {
    fr: "Valeur moyenne des réservations",
    en: "Average Booking Value",
    ar: "متوسط قيمة الحجز"
  },
  utilizationRate: {
    fr: "Taux d'utilisation",
    en: "Utilization Rate",
    ar: "معدل الاستخدام"
  },
  cancelledBookings: {
    fr: "Réservations annulées",
    en: "Cancelled Bookings",
    ar: "الحجوزات الملغاة"
  },
  feedbackRate: {
    fr: "Taux de retour",
    en: "Feedback Rate",
    ar: "معدل التقييم"
  },
  dateRange: {
    fr: "Plage de dates",
    en: "Date Range",
    ar: "النطاق الزمني"
  },
  location: {
    fr: "Emplacement",
    en: "Location",
    ar: "الموقع"
  },
  allLocations: {
    fr: "Tous les emplacements",
    en: "All Locations",
    ar: "جميع المواقع"
  },
  apply: {
    fr: "Appliquer",
    en: "Apply",
    ar: "تطبيق"
  },
  reset: {
    fr: "Réinitialiser",
    en: "Reset",
    ar: "إعادة تعيين"
  }
};

const AnalyticsStyles = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .nav-link:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
      
      .active-link {
        background-color: #1890ff !important;
      }
      
      .analytics-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
      }

      .reset-button:hover {
        background-color: #f0f7ff;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return null;
};

const AnalyticsReports = () => {
  const [language, setLanguage] = useState('en');
  const [isOpen, setIsOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [contentMarginLeft, setContentMarginLeft] = useState('280px');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [locations, setLocations] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL || '';
  
  // Utilisez useEffect pour mettre à jour la marge et gérer le resize
  useEffect(() => {
    const lang = localStorage.getItem('language') || 'en';
    setLanguage(lang);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update margin-left based on navbar state and screen size
  useEffect(() => {
    if (windowWidth < 768) {
      setContentMarginLeft('0px');
    } else {
      setContentMarginLeft(isOpen ? '280px' : '0px');
    }
  }, [isOpen, windowWidth]);

  // Stats state
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    activeUsers: 0,
    totalCars: 0,
    availableCars: 0,
    rentedCars: 0,
    averageBookingValue: 0,
    utilizationRate: 0,
    cancelledBookings: 0,
    feedbackRate: 0,
    changes: {
      revenue: 0,
      bookings: 0,
      users: 0,
      cars: 0,
      availableCars: 0,
      rentedCars: 0,
      avgBooking: 0,
      utilization: 0,
      cancelled: 0,
      feedback: 0
    }
  });
  const [chartData, setChartData] = useState({
    revenueData: { labels: [], datasets: [] },
    bookingsData: { labels: [], datasets: [] },
    utilizationData: { labels: [], datasets: [] },
    bookingStatusData: { labels: [], datasets: [] },
    topCarsData: { labels: [], datasets: [], totals: [] },
    satisfactionData: { labels: [], datasets: [] }
  });

  // Ajouter des états temporaires pour les filtres
  const [tempStartDate, setTempStartDate] = useState('');
  const [tempEndDate, setTempEndDate] = useState('');
  const [tempLocation, setTempLocation] = useState('all');

  // Helper functions
  const calculateChanges = (current, previous) => {
    if (!previous || previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-MA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    if (typeof amount !== 'number') return '0 MAD';
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (number) => {
    if (typeof number !== 'number') return '0';
    return new Intl.NumberFormat('fr-MA', {
      style: 'decimal',
      maximumFractionDigits: 0,
      useGrouping: true
    }).format(number);
  };

  const formatPercentage = (value) => {
    if (typeof value !== 'number') return '0%';
    return new Intl.NumberFormat('fr-MA', {
      style: 'percent',
      maximumFractionDigits: 0
    }).format(value / 100);
  };

  // Add this function to process bookings data by month
  const processBookingsByMonth = (bookings) => {
    console.log('Processing bookings for charts:', bookings);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyData = Array(12).fill(0);
    const monthlyRevenue = Array(12).fill(0);

    // Filtrer uniquement les réservations complétées
    const completedBookings = bookings.filter(booking => booking.status === 'completed');
    console.log('Completed bookings:', completedBookings);
    
    completedBookings.forEach(booking => {
      // Vérifier et traiter la date
      let date;
      try {
        if (booking.start_date) {
          date = new Date(booking.start_date);
          if (isNaN(date.getTime())) {
            console.error('Invalid start_date for booking:', booking.id);
            return; // Skip this booking
          }
        } else {
          console.error('No start_date for booking:', booking.id);
          return; // Skip this booking
        }
      } catch (error) {
        console.error('Error processing date for booking:', booking.id, error);
        return; // Skip this booking
      }

      const month = date.getMonth();
      
      // Traiter le montant
      let amount = 0;
      try {
        if (booking.total_price) {
          amount = parseFloat(booking.total_price);
          if (isNaN(amount)) {
            console.error('Invalid total_price for booking:', booking.id);
            amount = 0;
          }
        } else {
          console.error('No total_price for booking:', booking.id);
        }
      } catch (error) {
        console.error('Error processing amount for booking:', booking.id, error);
      }

      // Ne mettre à jour les tableaux que si nous avons des données valides
      if (month >= 0 && month < 12) {
        monthlyData[month]++;
        monthlyRevenue[month] += amount;
        console.log(`Booking ${booking.id} - Month: ${months[month]} - Amount: ${amount} MAD`);
      }
    });

    // Vérifier qu'il n'y a pas de NaN dans les données
    for (let i = 0; i < 12; i++) {
      if (isNaN(monthlyData[i])) monthlyData[i] = 0;
      if (isNaN(monthlyRevenue[i])) monthlyRevenue[i] = 0;
    }

    console.log('Monthly Bookings Data:', monthlyData);
    console.log('Monthly Revenue Data:', monthlyRevenue);

    return {
      labels: months,
      bookings: monthlyData,
      revenue: monthlyRevenue
    };
  };

  // Mettre à jour les options du graphique de revenus
  const revenueChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.parsed.y || 0;
            return `Revenue: ${formatCurrency(value)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { display: false },
        ticks: {
          callback: function(value) {
            return formatCurrency(value);
          }
        }
      },
      x: {
        grid: { display: false }
      }
    }
  };

  // Mettre à jour les options du graphique de réservations
  const bookingsChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.parsed.y || 0;
            return `Bookings: ${value}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { display: false },
        ticks: {
          stepSize: 1
        }
      },
      x: {
        grid: { display: false }
      }
    }
  };

  // Update or add this function to properly process car performance data
  const processCarPerformance = (bookings, cars) => {
    console.log('=== processCarPerformance Debug ===');
    console.log('Bookings:', bookings);
    console.log('Cars:', cars);
    
    const carStatsMap = {};
    
    // Filtrer uniquement les réservations complétées
    const completedBookings = bookings.filter(booking => booking.status === 'completed');
    console.log('Completed Bookings:', completedBookings);
    
    // Calculer le revenu total par voiture
    completedBookings.forEach(booking => {
      const carId = booking.car_id;
      if (!carStatsMap[carId]) {
        carStatsMap[carId] = { count: 0, total: 0 };
      }
      carStatsMap[carId].count += 1;
      
      // Ajouter le total_price de la réservation complétée au revenu total
      const bookingTotal = parseFloat(booking.total_price) || 0;
      console.log(`Booking ${booking.id} - Car ${carId} - Total Price:`, bookingTotal);
      carStatsMap[carId].total += bookingTotal;
    });
    
    const carStats = Object.entries(carStatsMap).map(([carId, data]) => {
      const car = cars.find(c => c.id === parseInt(carId));
      console.log(`Car ${carId} Stats:`, {
        car: car ? `${car.name} ${car.model}` : 'Unknown Car',
        count: data.count,
        total: data.total
      });
      return {
        car: car ? `${car.name} ${car.model}` : 'Unknown Car',
        count: data.count,
        total: data.total // Ceci est maintenant le revenu total réel
      };
    });
    
    // Trier par revenu total décroissant
    const sortedStats = carStats
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
    
    console.log('Final Sorted Stats:', sortedStats);
    return sortedStats;
  };

  // Add this function to fetch and process unique locations from cars
  const fetchLocations = async () => {
    try {
      const response = await axios.get(`${API_URL}/cars`);
      const cars = response.data;
      
      // Extract unique locations from cars
      const uniqueLocations = [...new Set(cars
        .map(car => car.location)
        .filter(location => location) // Remove null/undefined
      )];
      
      // Format locations for the dropdown
      const formattedLocations = uniqueLocations.map(location => ({
        id: location,
        name: location
      }));
      
      setLocations(formattedLocations);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  // Update the fetchStats function
  const fetchStats = async () => {
    try {
      const [carsRes, bookingsRes, usersRes, feedbacksRes] = await Promise.all([
        axios.get(`${API_URL}/cars`),
        axios.get(`${API_URL}/bookings`),
        axios.get(`${API_URL}/users`),
        axios.get(`${API_URL}/feedbacks`)
      ]);

      let cars = carsRes.data;
      let bookings = bookingsRes.data;
      const users = usersRes.data;
      const feedbacks = feedbacksRes.data;

      // Appliquer les filtres de date si définis
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        // Ajuster end à la fin de la journée
        end.setHours(23, 59, 59, 999);

        console.log('Filtering bookings between:', start, 'and', end);
        
        bookings = bookings.filter(booking => {
          if (!booking.start_date) return false;
          const bookingDate = new Date(booking.start_date);
          return bookingDate >= start && bookingDate <= end;
        });

        console.log('Filtered bookings:', bookings.length);
      }

      // Appliquer le filtre de localisation si défini
      if (selectedLocation && selectedLocation !== 'all') {
        cars = cars.filter(car => car.location === selectedLocation);
        bookings = bookings.filter(booking => {
          const car = cars.find(c => c.id === booking.car_id);
          return car !== undefined;
        });
      }

      // Calculate current stats
      const totalCars = cars.length;
      
      // Calculate stats from bookings table
      const currentDate = new Date();
      
      // Get active bookings (pending or completed with future dates)
      const activeBookings = bookings.filter(booking => {
        if (!booking.start_date || !booking.end_date) return false;
        const startDate = new Date(booking.start_date);
        const endDate = new Date(booking.end_date);
        return (booking.status === 'pending' || booking.status === 'completed') &&
               startDate <= currentDate && endDate >= currentDate;
      });
      
      // Get completed bookings
      const completedBookings = bookings.filter(booking => 
        booking.status === 'completed'
      );
      
      // Get pending bookings
      const pendingBookings = bookings.filter(booking => 
        booking.status === 'pending'
      );

      // Calculate rented cars from active bookings
      const rentedCars = activeBookings.length;
      const availableCars = totalCars - rentedCars;
      
      // Calculate total bookings
      const totalBookings = bookings.length;

      // Calculate revenue only from completed bookings
      const totalRevenue = completedBookings.reduce((sum, booking) => 
        sum + (parseFloat(booking.total_price) || 0), 0
      );

      const averageBookingValue = completedBookings.length > 0 ? 
        totalRevenue / completedBookings.length : 0;

      const activeUsers = users.filter(user => 
        user.status === 'active'
      ).length;

      // Calculate feedback rate from completed bookings
      const feedbackCount = completedBookings.filter(booking => 
        booking.has_feedback
      ).length;
      
      const feedbackRate = completedBookings.length > 0 ? 
        (feedbackCount / completedBookings.length) * 100 : 0;

      // Calculate utilization rate from active bookings
      const utilizationRate = totalCars > 0 ? 
        (rentedCars / totalCars) * 100 : 0;

      // Calculate changes from previous month
      const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
      const previousMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);

      const previousMonthBookings = bookings.filter(booking => {
        if (!booking.start_date) return false;
        const bookingDate = new Date(booking.start_date);
        return bookingDate >= previousMonth && bookingDate <= previousMonthEnd;
      });

      const previousMonthCompletedBookings = previousMonthBookings.filter(booking => 
        booking.status === 'completed'
      );

      const previousMonthActiveBookings = previousMonthBookings.filter(booking => {
        if (!booking.start_date || !booking.end_date) return false;
        const startDate = new Date(booking.start_date);
        const endDate = new Date(booking.end_date);
        return (booking.status === 'pending' || booking.status === 'completed') &&
               startDate <= previousMonthEnd && endDate >= previousMonth;
      });

      const previousMonthRevenue = previousMonthCompletedBookings.reduce((sum, booking) => 
        sum + (parseFloat(booking.total_price) || 0), 0
      );

      const previousMonthBookingsCount = previousMonthCompletedBookings.length;
      const previousMonthUtilization = totalCars > 0 ? 
        (previousMonthActiveBookings.length / totalCars) * 100 : 0;

      const changes = {
        revenue: calculateChanges(totalRevenue, previousMonthRevenue),
        bookings: calculateChanges(completedBookings.length, previousMonthBookingsCount),
        utilization: calculateChanges(utilizationRate, previousMonthUtilization)
      };

      // Get cancelled bookings
      const cancelledBookings = bookings.filter(booking => 
        booking.status === 'cancelled'
      );

      // Calculate cancelled bookings count
      const cancelledBookingsCount = cancelledBookings.length;

      // Calculate changes from previous month for cancelled bookings
      const previousMonthCancelledBookings = previousMonthBookings.filter(booking => 
        booking.status === 'cancelled'
      ).length;

      const cancelledChanges = calculateChanges(
        cancelledBookingsCount,
        previousMonthCancelledBookings
      );

      // Update stats with formatted values
      setStats({
        totalRevenue: formatCurrency(totalRevenue),
        totalBookings: formatNumber(totalBookings),
        activeUsers: formatNumber(activeUsers),
        totalCars: formatNumber(totalCars),
        availableCars: formatNumber(availableCars),
        rentedCars: formatNumber(rentedCars),
        averageBookingValue: formatCurrency(averageBookingValue),
        utilizationRate: formatPercentage(utilizationRate),
        cancelledBookings: formatNumber(cancelledBookingsCount),
        feedbackRate: formatPercentage(feedbackRate),
        changes: {
          revenue: formatNumber(changes.revenue),
          bookings: formatNumber(changes.bookings),
          utilization: formatNumber(changes.utilization),
          cancelled: formatNumber(cancelledChanges)
        }
      });

      // Process data for charts
      const monthlyStats = processBookingsByMonth(bookings);
      const topCars = processCarPerformance(bookings, cars);

      // Calculate booking status breakdown
      const bookingStatus = {
        pending: bookings.filter(b => b.status === 'pending').length,
        approved: bookings.filter(b => b.status === 'approved').length,
        completed: bookings.filter(b => b.status === 'completed').length,
        cancelled: bookings.filter(b => b.status === 'cancelled').length
      };

      // Calculate satisfaction scores from real feedbacks
      const ratings = feedbacks.reduce((acc, feedback) => {
        acc[feedback.stars] = (acc[feedback.stars] || 0) + 1;
        return acc;
      }, {1: 0, 2: 0, 3: 0, 4: 0, 5: 0});

      // Update chartData
      setChartData({
        revenueData: {
          labels: monthlyStats.labels,
          datasets: [{
            label: 'Revenue (DH)',
            data: monthlyStats.revenue,
            borderColor: '#1890ff',
            backgroundColor: 'rgba(24, 144, 255, 0.1)',
            fill: true,
            tension: 0.4
          }]
        },
        bookingsData: {
          labels: monthlyStats.labels,
          datasets: [{
            label: 'Number of Bookings',
            data: monthlyStats.bookings,
            backgroundColor: '#52c41a',
            borderRadius: 6
          }]
        },
        utilizationData: {
          labels: ['Total Cars', 'Available', 'Rented'],
          datasets: [{
            data: [totalCars, availableCars, rentedCars],
            backgroundColor: ['#1890ff', '#52c41a', '#ff4d4f'],
            borderWidth: 0
          }]
        },
        bookingStatusData: {
          labels: ['Pending', 'Approved', 'Completed', 'Cancelled'],
          datasets: [{
            data: [
              bookingStatus.pending,
              bookingStatus.approved,
              bookingStatus.completed,
              bookingStatus.cancelled
            ],
            backgroundColor: ['#faad14', '#52c41a', '#13c2c2', '#ff4d4f'],
            borderWidth: 0
          }]
        },
        topCarsData: {
          labels: topCars.map(car => car.car),
          datasets: [
            {
              label: 'Number of Bookings',
              data: topCars.map(car => car.count),
              backgroundColor: '#1890ff',
              borderRadius: 6
            },
            {
              label: 'Total Revenue',
              data: topCars.map(car => car.total),
              backgroundColor: 'rgba(24, 144, 255, 0.2)',
              borderRadius: 6,
              hidden: true
            }
          ]
        },
        satisfactionData: {
          labels: ['5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'],
          datasets: [{
            label: 'Number of Reviews',
            data: [
              ratings[5] || 0,
              ratings[4] || 0,
              ratings[3] || 0,
              ratings[2] || 0,
              ratings[1] || 0
            ],
            backgroundColor: [
              '#52c41a',
              '#95de64',
              '#faad14',
              '#ff7a45',
              '#ff4d4f'
            ],
            borderRadius: 6
          }]
        }
      });
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  // Add effect to fetch stats when filters change
  useEffect(() => {
    const fetchData = async () => {
      await fetchStats();
    };
    fetchData();
  }, [startDate, endDate, selectedLocation]);

  // Use fetchStats in useEffect
  useEffect(() => {
    fetchStats();
  }, []);

  // Add this useEffect to fetch locations
  useEffect(() => {
    fetchLocations();
  }, []);

  // Update handleFiltersChange to be synchronous
  const handleFiltersChange = () => {
    // Validate dates
    if (tempStartDate && tempEndDate) {
      const start = new Date(tempStartDate);
      const end = new Date(tempEndDate);
      if (start > end) {
        alert('Start date cannot be after end date');
        return;
      }
    }

    // Update filter states - this will trigger the useEffect
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
    setSelectedLocation(tempLocation);
  };

  // Update handleResetFilters to be synchronous
  const handleResetFilters = () => {
    setTempStartDate('');
    setTempEndDate('');
    setTempLocation('all');
    setStartDate('');
    setEndDate('');
    setSelectedLocation('all');
  };

  // Add isMobile check
  const isMobile = windowWidth < 768;

  return (
    <div style={{
      ...styles.container,
      padding: isMobile ? '0' : '20px',
      overflowX: 'hidden'
    }}>
      <AnalyticsStyles />
      <div style={{ 
        ...styles.mainWrapper,
        marginLeft: contentMarginLeft,
        transition: 'all 0.3s ease',
        padding: isMobile ? '0' : '20px',
        width: isMobile ? '100vw' : 'auto'
      }}>
        <div style={{
          ...styles.mainContent,
          padding: isMobile ? '12px' : '30px',
          maxWidth: isMobile ? '100%' : '1200px',
          borderRadius: isMobile ? '0' : '12px',
          boxShadow: isMobile ? 'none' : '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            ...styles.pageHeader,
            padding: isMobile ? '10px 0' : '0',
            marginBottom: isMobile ? '15px' : '40px'
          }}>
            <h1 style={{
              ...styles.pageTitle,
              fontSize: isMobile ? '18px' : '24px',
              marginBottom: isMobile ? '2px' : '8px'
            }}>Analytics & Reports</h1>
            <div style={{
              ...styles.titleUnderline,
              width: isMobile ? '40px' : '60px',
              marginBottom: isMobile ? '8px' : '15px'
            }}></div>
            <p style={{
              ...styles.pageSubtitle,
              fontSize: isMobile ? '12px' : '14px',
              marginBottom: isMobile ? '10px' : '24px'
            }}>View statistics and analyze business performance</p>
          </div>

          {/* Filters Section */}
          <div style={{
            ...styles.filtersContainer,
            flexDirection: isMobile ? 'column' : 'row',
            padding: isMobile ? '12px' : '20px',
            gap: isMobile ? '12px' : '20px',
            marginBottom: isMobile ? '20px' : '30px',
            backgroundColor: isMobile ? '#fff' : '#f8f9fa',
            borderRadius: isMobile ? '0' : '8px'
          }}>
            <div style={{
              ...styles.filterGroup,
              width: isMobile ? '100%' : 'auto'
            }}>
              <label style={{
                ...styles.filterLabel,
                fontSize: isMobile ? '13px' : '14px',
                marginBottom: isMobile ? '4px' : '8px'
              }}>Date Range</label>
              <div style={{
                ...styles.datePickerContainer,
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? '8px' : '10px'
              }}>
                <input
                  type="date"
                  value={tempStartDate}
                  onChange={(e) => setTempStartDate(e.target.value)}
                  style={{
                    ...styles.datePicker,
                    height: isMobile ? '36px' : '38px',
                    fontSize: isMobile ? '13px' : '14px'
                  }}
                />
                <span style={{
                  ...styles.dateRangeSeparator,
                  display: isMobile ? 'none' : 'block'
                }}>-</span>
                <input
                  type="date"
                  value={tempEndDate}
                  onChange={(e) => setTempEndDate(e.target.value)}
                  style={{
                    ...styles.datePicker,
                    height: isMobile ? '36px' : '38px',
                    fontSize: isMobile ? '13px' : '14px'
                  }}
                />
                <button 
                  onClick={handleFiltersChange}
                  style={{
                    ...styles.applyButton,
                    width: isMobile ? '100%' : 'auto',
                    height: isMobile ? '36px' : '38px',
                    fontSize: isMobile ? '13px' : '14px'
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
            <div style={{
              ...styles.filterGroup,
              width: isMobile ? '100%' : 'auto'
            }}>
              <label style={{
                ...styles.filterLabel,
                fontSize: isMobile ? '13px' : '14px',
                marginBottom: isMobile ? '4px' : '8px'
              }}>Location</label>
              <div style={{
                ...styles.locationContainer,
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? '8px' : '10px'
              }}>
                <select 
                  value={tempLocation}
                  onChange={(e) => setTempLocation(e.target.value)}
                  style={{
                    ...styles.locationSelect,
                    height: isMobile ? '36px' : '38px',
                    fontSize: isMobile ? '13px' : '14px'
                  }}
                >
                  <option value="all">All Locations</option>
                  {locations.map(location => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
                <button 
                  onClick={handleFiltersChange}
                  style={{
                    ...styles.applyButton,
                    width: isMobile ? '100%' : 'auto',
                    height: isMobile ? '36px' : '38px',
                    fontSize: isMobile ? '13px' : '14px'
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
            <div style={{
              ...styles.buttonGroup,
              width: isMobile ? '100%' : 'auto',
              marginTop: isMobile ? '4px' : '0'
            }}>
              <button 
                onClick={handleResetFilters}
                style={{
                  ...styles.resetButton,
                  width: isMobile ? '100%' : 'auto',
                  height: isMobile ? '36px' : '38px',
                  fontSize: isMobile ? '13px' : '14px'
                }}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div style={{
            ...styles.statsGrid,
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: isMobile ? '12px' : '20px',
            marginBottom: isMobile ? '20px' : '30px'
          }}>
            <div style={{
              ...styles.statsCard,
              padding: isMobile ? '15px' : '20px'
            }} className="analytics-card">
              <h3 style={{
                ...styles.statsTitle,
                fontSize: isMobile ? '13px' : '14px',
                marginBottom: isMobile ? '6px' : '8px'
              }}>{translations.totalRevenue[language]}</h3>
              <p style={{
                ...styles.statsValue,
                fontSize: isMobile ? '22px' : '28px',
                marginBottom: isMobile ? '2px' : '4px'
              }}>{stats.totalRevenue}</p>
              <p style={{
                ...styles.statsChange,
                fontSize: isMobile ? '11px' : '12px'
              }}>+{stats.changes.revenue}% vs last month</p>
            </div>
            <div style={{
              ...styles.statsCard,
              padding: isMobile ? '15px' : '20px'
            }} className="analytics-card">
              <h3 style={{
                ...styles.statsTitle,
                fontSize: isMobile ? '13px' : '14px',
                marginBottom: isMobile ? '6px' : '8px'
              }}>{translations.totalBookings[language]}</h3>
              <p style={{
                ...styles.statsValue,
                fontSize: isMobile ? '22px' : '28px',
                marginBottom: isMobile ? '2px' : '4px'
              }}>{stats.totalBookings}</p>
              <p style={{
                ...styles.statsChange,
                fontSize: isMobile ? '11px' : '12px'
              }}>+{stats.changes.bookings}% vs last month</p>
            </div>
            <div style={{
              ...styles.statsCard,
              padding: isMobile ? '15px' : '20px'
            }} className="analytics-card">
              <h3 style={{
                ...styles.statsTitle,
                fontSize: isMobile ? '13px' : '14px',
                marginBottom: isMobile ? '6px' : '8px'
              }}>{translations.activeUsers[language]}</h3>
              <p style={{
                ...styles.statsValue,
                fontSize: isMobile ? '22px' : '28px',
                marginBottom: isMobile ? '2px' : '4px'
              }}>{stats.activeUsers}</p>
              <p style={{
                ...styles.statsChange,
                fontSize: isMobile ? '11px' : '12px'
              }}>+{stats.changes.users}% vs last month</p>
            </div>
            <div style={{
              ...styles.statsCard,
              padding: isMobile ? '15px' : '20px'
            }} className="analytics-card">
              <h3 style={{
                ...styles.statsTitle,
                fontSize: isMobile ? '13px' : '14px',
                marginBottom: isMobile ? '6px' : '8px'
              }}>{translations.totalCars[language]}</h3>
              <p style={{
                ...styles.statsValue,
                fontSize: isMobile ? '22px' : '28px',
                marginBottom: isMobile ? '2px' : '4px'
              }}>{stats.totalCars}</p>
              <p style={{
                ...styles.statsChange,
                fontSize: isMobile ? '11px' : '12px'
              }}>+{stats.changes.cars}% vs last month</p>
            </div>
            <div style={{
              ...styles.statsCard,
              padding: isMobile ? '15px' : '20px'
            }} className="analytics-card">
              <h3 style={{
                ...styles.statsTitle,
                fontSize: isMobile ? '13px' : '14px',
                marginBottom: isMobile ? '6px' : '8px'
              }}>{translations.availableCars[language]}</h3>
              <p style={{
                ...styles.statsValue,
                fontSize: isMobile ? '22px' : '28px',
                marginBottom: isMobile ? '2px' : '4px'
              }}>{stats.availableCars}</p>
              <p style={{
                ...styles.statsChange,
                fontSize: isMobile ? '11px' : '12px'
              }}>+{stats.changes.availableCars}% vs last month</p>
            </div>
            <div style={{
              ...styles.statsCard,
              padding: isMobile ? '15px' : '20px'
            }} className="analytics-card">
              <h3 style={{
                ...styles.statsTitle,
                fontSize: isMobile ? '13px' : '14px',
                marginBottom: isMobile ? '6px' : '8px'
              }}>{translations.rentedCars[language]}</h3>
              <p style={{
                ...styles.statsValue,
                fontSize: isMobile ? '22px' : '28px',
                marginBottom: isMobile ? '2px' : '4px'
              }}>{stats.rentedCars}</p>
              <p style={{
                ...styles.statsChange,
                fontSize: isMobile ? '11px' : '12px'
              }}>+{stats.changes.rentedCars}% vs last month</p>
            </div>
            <div style={{
              ...styles.statsCard,
              padding: isMobile ? '15px' : '20px'
            }} className="analytics-card">
              <h3 style={{
                ...styles.statsTitle,
                fontSize: isMobile ? '13px' : '14px',
                marginBottom: isMobile ? '6px' : '8px'
              }}>{translations.averageBookingValue[language]}</h3>
              <p style={{
                ...styles.statsValue,
                fontSize: isMobile ? '22px' : '28px',
                marginBottom: isMobile ? '2px' : '4px'
              }}>{stats.averageBookingValue}</p>
              <p style={{
                ...styles.statsChange,
                fontSize: isMobile ? '11px' : '12px'
              }}>+{stats.changes.avgBooking}% vs last month</p>
            </div>
            <div style={{
              ...styles.statsCard,
              padding: isMobile ? '15px' : '20px'
            }} className="analytics-card">
              <h3 style={{
                ...styles.statsTitle,
                fontSize: isMobile ? '13px' : '14px',
                marginBottom: isMobile ? '6px' : '8px'
              }}>{translations.utilizationRate[language]}</h3>
              <p style={{
                ...styles.statsValue,
                fontSize: isMobile ? '22px' : '28px',
                marginBottom: isMobile ? '2px' : '4px'
              }}>{stats.utilizationRate}</p>
              <p style={{
                ...styles.statsChange,
                fontSize: isMobile ? '11px' : '12px'
              }}>+{stats.changes.utilization}% vs last month</p>
            </div>
            <div style={{
              ...styles.statsCard,
              padding: isMobile ? '15px' : '20px'
            }} className="analytics-card">
              <h3 style={{
                ...styles.statsTitle,
                fontSize: isMobile ? '13px' : '14px',
                marginBottom: isMobile ? '6px' : '8px'
              }}>{translations.cancelledBookings[language]}</h3>
              <p style={{
                ...styles.statsValue,
                fontSize: isMobile ? '22px' : '28px',
                marginBottom: isMobile ? '2px' : '4px'
              }}>{stats.cancelledBookings}</p>
              <p style={{
                ...styles.statsChange,
                fontSize: isMobile ? '11px' : '12px'
              }}>+{stats.changes.cancelled}% vs last month</p>
            </div>
            <div style={{
              ...styles.statsCard,
              padding: isMobile ? '15px' : '20px'
            }} className="analytics-card">
              <h3 style={{
                ...styles.statsTitle,
                fontSize: isMobile ? '13px' : '14px',
                marginBottom: isMobile ? '6px' : '8px'
              }}>{translations.feedbackRate[language]}</h3>
              <p style={{
                ...styles.statsValue,
                fontSize: isMobile ? '22px' : '28px',
                marginBottom: isMobile ? '2px' : '4px'
              }}>{stats.feedbackRate}</p>
              <p style={{
                ...styles.statsChange,
                fontSize: isMobile ? '11px' : '12px'
              }}>+{stats.changes.feedback}% vs last month</p>
            </div>
          </div>

          {/* Charts */}
          <div style={{
            ...styles.chartsGrid,
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: isMobile ? '12px' : '20px',
            marginTop: isMobile ? '20px' : '30px'
          }}>
            <div style={{
              ...styles.chartCard,
              minHeight: isMobile ? '250px' : '400px',
              padding: isMobile ? '12px' : '20px',
              borderRadius: isMobile ? '8px' : '12px'
            }}>
              <h3 style={{
                ...styles.chartTitle,
                fontSize: isMobile ? '13px' : '16px',
                marginBottom: isMobile ? '12px' : '20px'
              }}>Total Revenue Trend</h3>
              <div style={{ flex: 1, position: 'relative' }}>
                <Line 
                  data={chartData.revenueData} 
                  options={{
                    ...revenueChartOptions,
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: {
                      ...revenueChartOptions.plugins,
                      legend: {
                        ...revenueChartOptions.plugins.legend,
                        labels: {
                          boxWidth: isMobile ? 10 : 12,
                          font: {
                            size: isMobile ? 11 : 12
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
            <div style={{
              ...styles.chartCard,
              minHeight: isMobile ? '250px' : '400px',
              padding: isMobile ? '12px' : '20px',
              borderRadius: isMobile ? '8px' : '12px'
            }}>
              <h3 style={{
                ...styles.chartTitle,
                fontSize: isMobile ? '13px' : '16px',
                marginBottom: isMobile ? '12px' : '20px'
              }}>Total Bookings</h3>
              <div style={{ flex: 1, position: 'relative' }}>
                <Bar 
                  data={chartData.bookingsData}
                  options={{
                    ...bookingsChartOptions,
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: {
                      ...bookingsChartOptions.plugins,
                      legend: {
                        ...bookingsChartOptions.plugins.legend,
                        labels: {
                          boxWidth: isMobile ? 10 : 12,
                          font: {
                            size: isMobile ? 11 : 12
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
            <div style={{
              ...styles.chartCard,
              minHeight: isMobile ? '250px' : '400px',
              padding: isMobile ? '12px' : '20px',
              borderRadius: isMobile ? '8px' : '12px'
            }}>
              <h3 style={{
                ...styles.chartTitle,
                fontSize: isMobile ? '13px' : '16px',
                marginBottom: isMobile ? '12px' : '20px'
              }}>Car Utilization Rate</h3>
              <div style={{ flex: 1, position: 'relative' }}>
                <Doughnut 
                  data={chartData.utilizationData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { 
                        position: 'bottom',
                        labels: {
                          boxWidth: isMobile ? 10 : 12,
                          font: {
                            size: isMobile ? 11 : 12
                          }
                        }
                      }
                    },
                    cutout: '70%'
                  }}
                />
              </div>
            </div>
            <div style={{
              ...styles.chartCard,
              minHeight: isMobile ? '250px' : '400px',
              padding: isMobile ? '12px' : '20px',
              borderRadius: isMobile ? '8px' : '12px'
            }}>
              <h3 style={{
                ...styles.chartTitle,
                fontSize: isMobile ? '13px' : '16px',
                marginBottom: isMobile ? '12px' : '20px'
              }}>Booking Status Breakdown</h3>
              <div style={{ flex: 1, position: 'relative' }}>
                <Pie 
                  data={chartData.bookingStatusData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { 
                        position: 'bottom',
                        labels: {
                          boxWidth: isMobile ? 10 : 12,
                          font: {
                            size: isMobile ? 11 : 12
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
            <div style={{
              ...styles.chartCard,
              minHeight: isMobile ? '250px' : '400px',
              padding: isMobile ? '12px' : '20px',
              borderRadius: isMobile ? '8px' : '12px'
            }}>
              <h3 style={{
                ...styles.chartTitle,
                fontSize: isMobile ? '13px' : '16px',
                marginBottom: isMobile ? '12px' : '20px'
              }}>Top Performing Car Models</h3>
              <div style={{ flex: 1, position: 'relative' }}>
                <Bar 
                  data={chartData.topCarsData}
                  options={{
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            if (!context.chart || !context.chart.data || !context.chart.data.datasets) {
                              return '';
                            }
                            if (context.datasetIndex === 0) {
                              const total = context.chart.data.datasets[1]?.data[context.dataIndex] || 0;
                              return `${context.label}: ${context.parsed.x} réservations, ${formatCurrency(total)}`;
                            }
                            return null;
                          }
                        }
                      }
                    },
                    scales: {
                      x: {
                        beginAtZero: true,
                        grid: { display: false },
                        ticks: {
                          font: {
                            size: isMobile ? 11 : 12
                          }
                        }
                      },
                      y: {
                        grid: { display: false },
                        ticks: {
                          font: {
                            size: isMobile ? 11 : 12
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
            <div style={{
              ...styles.chartCard,
              minHeight: isMobile ? '250px' : '400px',
              padding: isMobile ? '12px' : '20px',
              borderRadius: isMobile ? '8px' : '12px'
            }}>
              <h3 style={{
                ...styles.chartTitle,
                fontSize: isMobile ? '13px' : '16px',
                marginBottom: isMobile ? '12px' : '20px'
              }}>Customer Satisfaction Score</h3>
              <div style={{ flex: 1, position: 'relative' }}>
                <Bar 
                  data={chartData.satisfactionData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: { display: false },
                        ticks: {
                          font: {
                            size: isMobile ? 11 : 12
                          }
                        }
                      },
                      x: {
                        grid: { display: false },
                        ticks: {
                          font: {
                            size: isMobile ? 11 : 12
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------
const styles = {
  container: {
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  mainWrapper: {
    position: 'relative',
    minHeight: '100vh',
    transition: 'margin-left 0.3s ease',
  },
  mainContent: {
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  pageHeader: {
    textAlign: 'center',
  },
  pageTitle: {
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  titleUnderline: {
    height: '3px',
    background: 'linear-gradient(90deg, #1890ff, #40a9ff)',
    margin: '0 auto',
    borderRadius: '2px',
    boxShadow: '0 2px 4px rgba(24, 144, 255, 0.3)',
  },
  pageSubtitle: {
    color: '#666',
    textAlign: 'center',
  },
  statsGrid: {
    display: 'grid',
    gap: '20px',
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    display: 'flex',
    flexDirection: 'column',
  },
  statsTitle: {
    color: '#666',
    fontWeight: '500',
  },
  statsValue: {
    fontWeight: '600',
    color: '#1a1a1a',
  },
  statsChange: {
    color: '#52c41a',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  chartsGrid: {
    display: 'grid',
    gap: '20px',
  },
  chartCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
  },
  chartTitle: {
    fontWeight: '500',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  filtersContainer: {
    display: 'flex',
    gap: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    alignItems: 'flex-end',
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1,
  },
  filterLabel: {
    color: '#666',
    fontWeight: '500',
  },
  datePickerContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flex: 1,
  },
  datePicker: {
    padding: '8px',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    backgroundColor: '#fff',
    flex: 1,
  },
  dateRangeSeparator: {
    color: '#666',
  },
  locationSelect: {
    padding: '8px',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    backgroundColor: '#fff',
    flex: 1,
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    alignItems: 'flex-end',
  },
  resetButton: {
    padding: '8px 20px',
    backgroundColor: '#fff',
    color: '#1890ff',
    border: '1px solid #1890ff',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.2s',
  },
  applyButton: {
    padding: '8px 20px',
    backgroundColor: '#1890ff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.2s',
  },
  locationContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flex: 1,
  },
};

export default AnalyticsReports;
