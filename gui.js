import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.math.BigDecimal;
import java.util.Scanner;

public class GUI {
    //Define everything for later, this is gonna get crazy

    private BigDecimal currentClicks = new BigDecimal("0");
    private BigDecimal clickMultiplier = new BigDecimal("1");
    private BigDecimal lifetimeClicks = new BigDecimal("0");
    private BigDecimal shopMultiplier = new BigDecimal("0");
    private BigDecimal lifetimeWithMultiplier = new BigDecimal("0");
    private int autoSpeed = 1;
    private BigDecimal autoClickers = new BigDecimal("0");
    private BigDecimal autoClickerMultiplier = new BigDecimal("1");
    private BigDecimal autoClickerUpgradePriceMultiplier = new BigDecimal("1");
    private final BigDecimal one = new BigDecimal("1.0");
    private final BigDecimal hundred = new BigDecimal("100");
    private final BigDecimal fifty = new BigDecimal("50");
    private final BigDecimal twentyFive = new BigDecimal("25");
    private final BigDecimal one_half = new BigDecimal("1.5");
    private int compareThing;
    private boolean timerStarted = false;


    private JLabel cash;
    private JLabel lifetime;
    private JFrame frame;
    private JButton clicker;
    private JPanel panel;
    private JButton shop;
    private JLabel lifetimeMulti;
    private JButton upgradeAutoClickers;
    private JButton buyAutoClickers;
    private JLabel shopPrices;

    // Defining the action cause I have to for this to be much easier
    ActionListener autoClickerAction = new ActionListener() {
        public void actionPerformed(ActionEvent evt) {
            lifetimeWithMultiplier = lifetimeWithMultiplier.add(autoClickerMultiplier.multiply(autoClickers));
            currentClicks = currentClicks.add(autoClickerMultiplier.multiply(autoClickers));
            lifetimeMulti.setText("Lifetime Earnings: " + lifetimeWithMultiplier);
            cash.setText("Number of clicks: "+currentClicks);
        }
    };
    private Timer autoClicker = new Timer(1000/autoSpeed, autoClickerAction);

    public GUI() {
        // Now that everything is created, actually make them usable

        frame = new JFrame();
        shop = new JButton("Upgrade your clicks");
        clicker = new JButton("Click Me");
        lifetime = new JLabel("Lifetime clicks: "+lifetimeClicks, SwingConstants.CENTER);
        lifetimeMulti = new JLabel("Lifetime Earnings: "+lifetimeWithMultiplier, SwingConstants.CENTER);
        upgradeAutoClickers = new JButton("Upgrade the AutoClickers");
        buyAutoClickers = new JButton("Buy more AutoClickers");


        cash = new JLabel("Number of clicks: 0", SwingConstants.CENTER);
        panel = new JPanel();
        // This is where I found the answer for separate buttons
        // https://stackoverflow.com/questions/5911565/how-to-add-multiple-actionlisteners-for-multiple-buttons-in-java-swing/5911621
        clicker.addActionListener(
                new ActionListener() {

                    public void actionPerformed(ActionEvent e) {
                        currentClicks = currentClicks.add(clickMultiplier);
                        lifetimeWithMultiplier = lifetimeWithMultiplier.add(clickMultiplier);
                        lifetimeClicks = lifetimeClicks.add(one);
                        cash.setText("Number of clicks: " + currentClicks);
                        lifetime.setText("Lifetime clicks: " + lifetimeClicks);
                        lifetimeMulti.setText("Lifetime Earnings: "+lifetimeWithMultiplier);
                        //System.out.println(currentClicks);
                    }
                }
        );
        shop.addActionListener(
                new ActionListener() {
                    public void actionPerformed(ActionEvent e) {
                        compareThing = currentClicks.compareTo(hundred.add(fifty.multiply(shopMultiplier)));
                        System.out.println(compareThing);
                        if (compareThing == 1){
                            currentClicks = currentClicks.subtract(hundred.add(fifty.multiply(shopMultiplier)));
                            shopMultiplier = shopMultiplier.add(one);
                            clickMultiplier = clickMultiplier.add(one);
                            cash.setText("Number of clicks: " + currentClicks);
                            shop.setText("Upgrade your clicks: "+clickMultiplier);
                            //System.out.println(clickMultiplier);
                        }

                    }
                }
        );
        upgradeAutoClickers.addActionListener(
                new ActionListener() {
                    public void actionPerformed(ActionEvent e) {
                        compareThing = currentClicks.compareTo(hundred.add(hundred.multiply(new BigDecimal(String.valueOf(autoClickerUpgradePriceMultiplier)))));
                        if (compareThing == 1){
                            currentClicks = currentClicks.subtract(hundred.add(hundred.multiply(new BigDecimal(String.valueOf(autoClickerUpgradePriceMultiplier)))));
                            cash.setText("Number of clicks: " + currentClicks);
                            autoClickerMultiplier = autoClickerMultiplier.add(autoClickerMultiplier);
                            upgradeAutoClickers.setText("Upgrade AutoClickers: "+autoClickerMultiplier);
                            autoClickerUpgradePriceMultiplier = new BigDecimal(String.valueOf(autoClickerUpgradePriceMultiplier.multiply(one_half)));
                        }
                    }
                }
        );
        buyAutoClickers.addActionListener(
                new ActionListener() {
                    public void actionPerformed(ActionEvent e) {
                        compareThing = currentClicks.compareTo(hundred.add(twentyFive.multiply(autoClickers)));
                        if (compareThing == 1) {
                            currentClicks = currentClicks.subtract(hundred.add(twentyFive.multiply(autoClickers)));
                            cash.setText("Number of clicks: " + currentClicks);
                            autoClickers = autoClickers.add(one);
                            buyAutoClickers.setText("Buy more AutoClickers: "+autoClickers);
                            if (!timerStarted) {
                                autoClicker.start();
                                timerStarted = true;
                                System.out.println("timer Started");
                            }
                        }
                    }
                }
        );

        // Actually create the window, specifically the contents of the panel
        panel.setBorder(BorderFactory.createEmptyBorder(30, 30, 10, 30));
        panel.setLayout(new GridLayout(4, 2));
        panel.add(clicker);
        panel.add(shop);
        panel.add(buyAutoClickers);
        panel.add(upgradeAutoClickers);
        panel.add(cash);
        panel.add(lifetime);
        panel.add(lifetimeMulti);

        // Initialize the window with the panel, and make it visible
        frame.add(panel, BorderLayout.CENTER);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setTitle("Clicker Game");
        frame.pack();
        frame.setVisible(true);


    }

    public static void main(String[] args) {

        // Anything for debugging can go here

        // Tell the program to go to the GUI instead of here, so that I can manage it better
        new GUI();

    }
}
